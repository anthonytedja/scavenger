const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

window.onload = function () {
    const scene = params.id;
    console.log(scene);
    if (scene) {
        $('#challengenum').toggleClass('aos-init');
        $('#challengenum').toggleClass('aos-animate');
        $('#notes').toggleClass('aos-init');
        $('#notes').toggleClass('aos-animate');
        $('#challengenum').toggleClass('aos-init');
        $('#challengeimage').toggleClass('aos-animate');
        // API request scene details
        if (true) { // When valid
            setTimeout(() => {
                $('#noscene').css('display', 'none');
                $('#scene').css('display', 'initial');
                $('#challengenum').toggleClass('aos-init');
                $('#notes').toggleClass('aos-init');
                $('#challengeimage').toggleClass('aos-init');
                AOS.refresh();
            }, 0);
        }
    }
};