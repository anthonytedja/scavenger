const form = $('#form');
const input = $('#inputvalue');
const scene = $('#scene');
const noscene = $('#noscene');
const challengenum = $('#challengenum');
const notes = $('#notes');
const challengeimage = $('#challengeimage');
const invalidid = $('#invalidid');
const validmessage = $('#validmessage');
const invalidmessage = $('#invalidmessage');
const loading = $('#loading');
const spinner = $('#spinner');
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let need_whitespace = false;

window.onload = function () {
    if (params.id) {
        loading.css('display', 'inline-flex');
        scene.removeClass('aos-init aos-animate');
        challengenum.removeClass('aos-init aos-animate');
        notes.removeClass('aos-init aos-animate');
        challengeimage.removeClass('aos-init aos-animate');
        form.removeClass('aos-init aos-animate');

        validateId();
    }
};

input.on('input', (event) => {
    event.preventDefault();
    form.removeClass('was-validated');
    input.removeClass('is-invalid is-valid');
});

form.submit(function (e) {
    e.preventDefault();
    spinner.css('display', 'inline-flex');
    input.val(need_whitespace ? input.val().toLowerCase() : input.val().replace(/\s+/, "").toLowerCase());
    validateInput();
});

function validateId() {
    // return {
    //     valid: `${params.id == 1}`,
    //     image: './assets/img/anya.jpg',
    //     challenge_num: '1',
    //     notes: 'Hint: Waku Waku',
    //     need_whitespace: 'false'
    // };
    fetch(`https://shunt.onrender.com/getimg/${params.id}`)
        .then((data) => data.json())
        .then((result) => {
            loading.css('display', 'none');
            if (result.valid && JSON.parse(result.valid)) {
                noscene.css('display', 'none');
                scene.css('display', 'initial');

                challengenum.html(`Challenge #${result.challenge_num}`);
                if (result.notes) {
                    notes.html(`${result.notes}`);
                    notes.css('display', 'initial');
                }
                challengeimage.attr("src", result.image);

                scene.addClass('aos-init');
                challengenum.addClass('aos-init');
                notes.addClass('aos-init');
                challengeimage.addClass('aos-init');
                form.addClass('aos-init');
                AOS.refresh();

                need_whitespace = JSON.parse(result.need_whitespace);
            } else {
                invalidid.css('display', 'inline-block');
                invalidid.html(`Could not find any challenges with the ID: ${params.id}`);
            }
        });
}

function validateInput() {
    // return {
    //     valid: `${input.val() === 'anya'}`,
    //     clue: 'waku waku',
    //     code: 'X'
    // };
    fetch('https://shunt.onrender.com/submit', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: params.id,
            data: input.val()
        })
    })
        .then((data) => data.json())
        .then((result) => {
            spinner.css('display', 'none');
            if (result.valid && JSON.parse(result.valid)) {
                input.addClass("is-valid").removeClass("is-invalid");
                input.get(0).setCustomValidity("");
                validmessage.html(`Your answer is correct!<br><br>CLUE: "${result.clue}"<br>CODE: "${result.code}"`);
            } else {
                input.removeClass("is-valid").addClass("is-invalid");
                input.get(0).setCustomValidity("invalid");
                invalidmessage.html(`Your answer is incorrect.`);
            }
            form.addClass('was-validated');
        });
}
