/* ==================================================
   PAGE NAVIGATION
================================================== */

function showPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }


    // Bottom navigation

    document.querySelectorAll(".bottom-nav button")
        .forEach(button => {

            button.classList.remove("active");

        });


    const navButton =
        document.getElementById("nav-" + pageName);

    if (navButton) {
        navButton.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==================================================
   LANDING → LOGIN
================================================== */

function openLogin() {

    showPage("login");

}


/* ==================================================
   SIGN UP
================================================== */

function showSignup() {

    showPage("signup");

}


/* ==================================================
   LOGIN
================================================== */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();


        /*
            DEMO LOGIN

            Email:
            farmer@gmail.com

            Password:
            123456
        */

        if (
            email === "farmer@gmail.com" &&
            password === "123456"
        ) {

            loginSuccess();

        }

        else {

            alert(
                "Invalid login.\n\n" +
                "Use:\n" +
                "Email: farmer@gmail.com\n" +
                "Password: 123456"
            );

        }

    });


function loginSuccess() {

    document
        .getElementById("bottomNav")
        .classList.remove("hidden");

    showPage("home");

}


/* ==================================================
   SIGN UP
================================================== */

document
    .getElementById("signupForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Account created successfully!"
        );

        showPage("home");

        document
            .getElementById("bottomNav")
            .classList.remove("hidden");

    });


/* ==================================================
   PASSWORD SHOW / HIDE
================================================== */

function togglePassword() {

    const password =
        document.getElementById("password");

    const eye =
        document.getElementById("eyeIcon");


    if (password.type === "password") {

        password.type = "text";

        eye.className =
            "fa-regular fa-eye-slash";

    }

    else {

        password.type = "password";

        eye.className =
            "fa-regular fa-eye";

    }

}


/* ==================================================
   FORGOT PASSWORD
================================================== */

function forgotPassword() {

    alert(
        "Password reset link will be sent to your email."
    );

}


/* ==================================================
   SHORTCUT NAVIGATION
================================================== */

function openScan() {

    showPage("scan");

}

function openHistory() {

    showPage("history");

}

function openAssistant() {

    showPage("assistant");

}

function openProfile() {

    showPage("profile");

}


/* ==================================================
   IMAGE UPLOAD
================================================== */

function openUpload() {

    document
        .getElementById("imageInput")
        .click();

}


function handleImage(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Please select an image."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        document
            .getElementById("previewImage")
            .src = e.target.result;


        document
            .getElementById("previewContainer")
            .classList.remove("hidden");

    };


    reader.readAsDataURL(file);

}


/* ==================================================
   CAMERA
================================================== */

function takePhoto() {

    document
        .getElementById("cameraInput")
        .click();

}


/* ==================================================
   REMOVE IMAGE
================================================== */

function removeImage() {

    document
        .getElementById("previewImage")
        .src = "";


    document
        .getElementById("previewContainer")
        .classList.add("hidden");


    document
        .getElementById("imageInput")
        .value = "";

}


/* ==================================================
   CROP SELECTION
================================================== */

function selectCrop(button) {

    const parent =
        button.parentElement;


    parent
        .querySelectorAll(".crop")
        .forEach(item => {

            item.classList.remove("selected");

        });


    button.classList.add("selected");

}


/* ==================================================
   AI ANALYSIS
================================================== */

function analyzeLeaf() {

    const image =
        document.getElementById("previewImage").src;


    if (!image) {

        alert(
            "Please take a photo or upload a leaf image first."
        );

        return;

    }


    const selectedCrop =
        document.querySelector(
            "#scan .crop.selected"
        );


    let crop = "Tomato";


    if (selectedCrop) {

        crop =
            selectedCrop.innerText
                .replace("🍅", "")
                .replace("🥔", "")
                .replace("🌾", "")
                .replace("🌽", "")
                .replace("🧵", "")
                .trim();

    }


    let disease =
        "Tomato Early Blight";

    let confidence =
        "94%";


    if (crop === "Potato") {

        disease =
            "Potato Early Blight";

        confidence =
            "89%";

    }


    if (crop === "Rice") {

        disease =
            "Healthy Leaf";

        confidence =
            "96%";

    }


    if (crop === "Maize") {

        disease =
            "Healthy Leaf";

        confidence =
            "96%";

    }


    showResult(
        disease,
        crop,
        confidence,
        disease === "Healthy Leaf"
            ? "Healthy"
            : "Diseased"
    );

}


/* ==================================================
   RESULT MODAL
================================================== */

function showResult(
    title,
    crop,
    confidence,
    status
) {

    document
        .getElementById("resultTitle")
        .innerText = title;


    document
        .getElementById("resultCrop")
        .innerText = crop;


    document
        .getElementById("resultConfidence")
        .innerText = confidence;


    document
        .getElementById("resultStatus")
        .innerText = status;


    const statusElement =
        document.getElementById(
            "resultStatus"
        );


    if (status === "Healthy") {

        statusElement.style.background =
            "#e1f3e3";

        statusElement.style.color =
            "#3c8050";

    }

    else {

        statusElement.style.background =
            "#f9e4e4";

        statusElement.style.color =
            "#a94444";

    }


    document
        .getElementById("resultModal")
        .classList.remove("hidden");

}


function closeModal() {

    document
        .getElementById("resultModal")
        .classList.add("hidden");

}


/* ==================================================
   AI ASSISTANT
================================================== */

function sendMessage() {

    const input =
        document.getElementById(
            "questionInput"
        );


    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    addUserMessage(message);


    input.value = "";


    setTimeout(function() {

        let response =
            "For better crop health, monitor your leaves regularly, avoid overwatering and maintain good airflow around the plants.";


        const text =
            message.toLowerCase();


        if (
            text.includes("yellow")
        ) {

            response =
                "Yellow spots can have several causes, including nutrient problems or disease. Take a clear photo of the affected leaf and use the Scan feature for a preliminary assessment.";

        }


        else if (
            text.includes("late blight")
        ) {

            response =
                "To reduce late blight risk, avoid overhead watering, improve air circulation, remove affected leaves and monitor the crop regularly.";

        }


        else if (
            text.includes("scan")
        ) {

            response =
                "The best time to scan is in good natural daylight. Take a clear, close-up photo of one leaf without shadows.";

        }


        addBotMessage(response);


    }, 700);

}


function addUserMessage(message) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    const messageBox =
        document.createElement("div");


    messageBox.className =
        "user-message";


    messageBox.innerHTML =
        `<div>${escapeHTML(message)}</div>`;


    container.appendChild(messageBox);

}


function addBotMessage(message) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    const messageBox =
        document.createElement("div");


    messageBox.className =
        "bot-message";


    messageBox.innerHTML =
        `
        🌱
        <div>
            ${escapeHTML(message)}
        </div>
        `;


    container.appendChild(messageBox);

}


function askQuestion(question) {

    document
        .getElementById("questionInput")
        .value = question;


    sendMessage();

}


function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ==================================================
   DARK MODE
================================================== */

function toggleDarkMode() {

    const checkbox =
        document.getElementById(
            "darkMode"
        );


    document.body.classList.toggle(
        "dark",
        checkbox.checked
    );

}


/* ==================================================
   LOGOUT
================================================== */

function logout() {

    const confirmation =
        confirm(
            "Do you want to log out?"
        );


    if (confirmation) {

        document
            .getElementById("bottomNav")
            .classList.add("hidden");


        showPage("landing");

    }

}


/* ==================================================
   CLOSE MODAL OUTSIDE
================================================== */

document
    .getElementById("resultModal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeModal();

            }

        }
    );