/**
 * Cookie Consent Banner Display
 * See https://github.com/frizbee/cookieconsent for more details.
 */
window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#252e39"
            },
            "button": {
                "background": "#14a7d0"
            }
        },
        "position": "bottom-right",
        "content": {
            "message": "Clipstash is using cookies to improve your experience on our site. By continuing to use our site you consent to the use of cookies",
            "dismiss": "Got it!",
            "link": "Learn more",
            "href": "http://cookies.insites.com/about-cookies"
        }
    })
});