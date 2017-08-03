module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '838986906533-saeng0kbhag1jnpnecik0nhk4nn15tjc.apps.googleusercontent.com', // your App ID
        'clientSecret'  : 'L-ltCliIovwVeHAz2F9QwpxH', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};