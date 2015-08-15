window.onload = function() {
// Fake navigation by clicking the register or login buttons.

var nav = new Vue({
    el: '#fake-nav',
    methods: {
        open: function(which, e) {
            e.preventDefault();
            if (modal.active !== null) {
                $('#form-'+modal.active).removeClass('active');
                $('#'+modal.active+'-form').removeClass('active');
            }

            $('#login-modal').addClass('active');
            $('#form-'+which).addClass('active');
            $('#'+which+'-form').addClass('active');
            modal.active = which;
        }
    }
});

// Modal!

var modal_submit_register = 'Register';
var modal_submit_password = 'Reset Password';
var modal_submit_login    = 'Login';

var modal = new Vue({
    el: '#login-modal',
    data: {
        active: null,

        // Modal error messages
        registerError: '',
        loginError:    '',
        passwordError: '',

        // Submit button text
        registerSubmit: modal_submit_register,
        passwordSubmit: modal_submit_password,
        loginSubmit: modal_submit_login,

        // Modal text fields
        registerName:     '',
        registerEmail:    '',
        registerPassword: '',
        loginUser:        '',
        loginPassword:    '',
        passwordEmail:    '',

        // Submit locks
        registerLock: false,
        loginLock:    false,
        passwordLock: false,
    },
    methods: {
        flip: function(which, e) {
            e.preventDefault();
            if (which !== this.active) {
                $('#form-' + this.active).removeClass('active');
                $('#form-' + which).addClass('active');
                $('#'+which+'-form').addClass('active');
                $('#'+this.active+'-form').removeClass('active');

                this.active = which;

                // Remove error messages
                this.$set('registerError', '');
                this.$set('passwordError', '');
                this.$set('loginError', '');
            }
        },
        close: function(e) {
            e.preventDefault();
            if (e.target === this.$el) {
                $('#login-modal').removeClass('active');
                // Remove error messages
                this.$set('registerError', '');
                this.$set('passwordError', '');
                this.$set('loginError', '');
            }
        },
        submit: function(which, e) {
            e.preventDefault();

            // Don't continue if we're locked in.
            if (modal[which+'Lock'] === true) return;

            // Lock so users can't submit constantly.
            this[which+'Lock'] = true;
            $('#'+which+'Submit').addClass('disabled');

            var data = { form: which };

            switch(which) {
                case 'register':
                    data.name = this.registerName;
                    data.email = this.registerEmail;
                    data.password = this.registerPassword;
                    this.$set('registerSubmit', 'Registering...');
                    break;
                case 'login':
                    data.user = this.loginUser;
                    data.password = this.loginPassword;
                    this.$set('loginSubmit', 'Logging In...');
                    break;
                case 'password':
                    data.email = this.passwordEmail;
                    this.$set('passwordSubmit', 'Resetting Password...')
                    break;
            }

            // Simulate a post, or whatever method you want to use.
            setTimeout(function() {
                modal.$set(which+'Lock', false);
                modal.$set('passwordSubmit', modal_submit_password);
                modal.$set('loginSubmit', modal_submit_login);
                modal.$set('registerSubmit', modal_submit_register);
                $('#'+which+'Submit').removeClass('disabled');
                modal.$set(which+'Error', ' Error! You can\'t actually submit!');
            }, 1500);
        }
    }
});

// --
};
