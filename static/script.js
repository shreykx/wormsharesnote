var url = "http://localhost:8080"
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
    const fontadder = document.querySelector('.font-adder')
    const font = fonts_array[Math.floor(Math.random() * fonts_array.length)]
    fontadder.classList.add(font)
    const copy_text = document.getElementById('copy_text');
    const uploadbtn = document.getElementById('uploadbtn');


    uploadbtn.addEventListener('click', () => {
        const note = task_put.value.trim();
        if (note.length != 0) {
            fetch('/post/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ note: note, font: font })
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then((data) => {
                copyTextToClipboard(`${url}/note/${data.id}`)
                alert("Copied link to clipboard.")
            })

        } else {
            alert("Please write something...")
        }

    })


    copy_text.addEventListener('click', () => copyTextToClipboard(task_put.value))
})
