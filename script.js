document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header h1');
    const intro = document.querySelector('.intro h2');
    const details = document.querySelector('.details h3');

    // Function to change text color on hover
    function changeColorOnHover(element) {
        element.addEventListener('mouseenter', () => {
            element.style.color = '#ff9a9e';
        });

        element.addEventListener('mouseleave', () => {
            element.style.color = '#fff';
        });
    }

    changeColorOnHover(header);
    changeColorOnHover(intro);
    changeColorOnHover(details);
});
