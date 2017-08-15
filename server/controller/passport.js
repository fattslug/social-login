var FacebookStrategy = require('passport-facebook').Strategy; // Import Passport-Facebook Package
var TwitterStrategy = require('passport-twitter').Strategy; // Import Passport Twitter Package
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Passport Google Package
var USER = require('../models/user'); // Import User Model
var session = require('express-session'); // Import Express Session Package
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom secret to use with JWT

// load the auth variables
var configAuth = require('../utility/config');

// Google Routes
var token;


module.exports = function (app, passport) {
// Start Passport Configuration Settings
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));
// End Passport Configuration Settings


    // Serialize users once logged in   
    passport.serializeUser(function (user, done) {
        console.log("Serializing user...");
        // Check if user's social media account has an error
        if (user.error) {
            token = 'unconfirmed/error'; // Set url to different error page
        } else {
            token = user.id; // If account active, give user token
            console.log(user);
        }
        done(null, user); // Return user object
    });

    // Deserialize Users once logged out    
    passport.deserializeUser(function (id, done) {
        USER.findById(id, function (err, user) {
            done(err, user); // Complete deserializeUser and return done
        });
    });

    // Google Strategy  
    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
        },
        function (accessToken, refreshToken, profile, done) { // called when we hit the callbackURL
            console.log("Google Strategy callback...");

            USER.findOne({'email': profile.emails[0].value}).select('username active password email').exec(function (err, user) {
                if (err) {
                    console.log("Error - see log");
                    done(err);
                }

                if (user && user !== null) {
                    console.log("User found - retrieving profile...");
                    done(null, user);
                } else {
                    console.log("No existing user found - creating new user...");
                    var photo = profile.photos[0].value.slice(0,profile.photos[0].value.length-2);
                    var newUser = new USER({
                        userID: profile.id,
                        photo: photo + "500",
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        currentOccupation: profile._json.occupation,
                        sm_platform: "Google",
                        token: accessToken,

                        placesLived: profile._json.placesLived,
                        organizations: profile._json.organizations
                    });
                    newUser.save(function (mongoErr) {
                        if (mongoErr) {
                            console.log("Error saving new user.");
                            done(mongoErr);
                        } else {
                            console.log("New user added!");
                            done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    // Facebook Strategy
    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID, // Replace with your Facebook Developer App client ID
            clientSecret: configAuth.facebookAuth.clientSecret, // Replace with your Facebook Developer client secret
            callbackURL: configAuth.facebookAuth.callbackURL, // Replace with your Facebook Developer App callback URL
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("Facebook Strategy callback...");

            USER.findOne({'email': profile.emails[0].value}).select('username active password email').exec(function(err, user) {
                if (err) done(err);

                if (user && user !== null) {
                    console.log("User found - retrieving profile...");
                    done(null, user);
                } else {
                    console.log("No existing user found - creating new user...");
                    var newUser = new USER({
                        userID: profile.id,
                        photo: "https://graph.facebook.com/" + profile.id + "/picture?type=large&w‌​idth=720&height=720",
                        email: profile.emails[0].value,
                        sm_platform: "Facebook",
                        name: profile.displayName,
                        token: accessToken
                    });
                    newUser.save(function (mongoErr) {
                        if (mongoErr) {
                            console.log("Error saving new user.");
                            done(mongoErr);
                        } else {
                            console.log("New user added!");
                            done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    // Twitter Strategy
    // passport.use(new TwitterStrategy({
    //         consumerKey: 'nAsRdF40TX5fQ7QivmuJGWWSj', // Replace with your Twitter Developer App consumer key
    //         consumerSecret: 'WH4MaKulaiPzrBttgS5KlQzanXmZIKZ4hmAlflfwX8jk3WNTwA', // Replace with your Twitter Developer App consumer secret
    //         callbackURL: "http://www.herokutestapp3z24.com/auth/twitter/callback", // Replace with your Twitter Developer App callback URL
    //         userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    //     },
    //     function(token, tokenSecret, profile, done) {
    //         if (profile.emails) {
    //             User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     if (user && user !== null) {
    //                         done(null, user);
    //                     } else {
    //                         done(err);
    //                     }
    //                 }
    //             });
    //         } else {
    //             user = {}; // Since no user object exists, create a temporary one in order to return an error
    //             user.id = 'null'; // Temporary id
    //             user.active = true; // Temporary status
    //             user.error = true; // Ensure error is known to exist
    //             done(null, user); // Serialize and catch error
    //         }
    //     }
    // ));

    // Google Routes
    app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email', 'https://www.googleapis.com/auth/calendar']}));
    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:4200/login-error'}), function (req, res) {
        console.log("Redirecting back to app...");
        res.redirect('http://localhost:4200/login/' + token); // Redirect user with newly assigned token
    });

    // Twitter Routes
    // app.get('/auth/twitter', passport.authenticate('twitter'));
    // app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/twittererror' }), function(req, res) {
    //     res.redirect('/twitter/' + token); // Redirect user with newly assigned token
    // });

    // Facebook Routes
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:4200/login-error' }), function(req, res) {
        console.log("Redirecting back to app...");
        res.redirect('http://localhost:4200/login/' + token); // Redirect user with newly assigned token
    });

    return passport; // Return Passport Object
};