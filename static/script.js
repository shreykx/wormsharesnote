function copyTextToClipboard(text) {
    // Create a textarea element
    const textarea = document.createElement('textarea');

    // Set the value of the textarea to the text to be copied
    textarea.value = text;

    // Make the textarea non-editable and hide it from view
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px'; // Move off-screen

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select and copy the text inside the textarea
    textarea.select();
    document.execCommand('copy');

    // Clean up: remove the textarea from the document
    document.body.removeChild(textarea);
}

window.addEventListener('load', () => {
    const fonts_array = ['playwrite-pe', 'montserrat', 'playfair-display']

    const task_put = document.getElementById('task_put');
    task_put.classList.add(fonts_array[Math.floor(Math.random() * fonts_array.length)])
    const copy_text = document.getElementById('copy_text');


    copy_text.addEventListener('click', () => copyTextToClipboard(task_put.value))
})
