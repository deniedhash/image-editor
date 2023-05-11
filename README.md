# Image-Editor App

### How this app works:-

    1. Setting up the Canvas: We're using the fabric.js library, which provides a powerful and flexible object model for working with HTML canvas. We create an instance of a fabric.Canvas and attach it to a canvas element in the DOM.

    2. State Variables: We're using React's useState hook to manage various pieces of state in the application:
        text: This is the text that the user inputs to place over the image.
        color, font, size: These represent the color, font, and size of the text that the user inputs.
        coords: This represents the x and y coordinates of where the text will be placed on the image.
        backgroundColor: This is the color that will be used as the background color of the canvas.

    3. Image Upload: When a user selects an image file to upload, we use a FileReader to read the data from the file. Once the data is available, we use fabric.Image.fromURL to create a new image object. We then scale and position the image to fit within the canvas, and set it as the background of the canvas.

    4. Adding Text: When a user clicks the "Add Text" button, we create a new fabric.IText object with the specified properties (text, color, font, size, and coordinates) and add it to the canvas. The IText object is interactive and editable, so the user can click on the text to edit it.

    5. Changing Background Color: When a user selects a new background color, we use fabric.Canvas.setBackgroundColor to change the background color of the canvas.

    6. React Effects: We're using React's useEffect hook to perform side effects in our component. Specifically, we use an effect to update the background color of the canvas whenever the backgroundColor state changes.

    7. React Event Handlers: We're using event handlers to respond to user interactions like text input, image upload, and button clicks. These handlers update the component's state, which in turn updates the canvas.

    8. Rendering the Component: Finally, the component renders a form for the user to input text and select text properties, an input for image upload, a canvas element for the fabric.js canvas, and a button to add text to the canvas. The form fields and buttons are connected to the event handlers and state variables we've set up.


#### Current Bugs:-

a) The image keeps overflowing out of the canvas. I have no idea why. I have worked all night on it but still no clue.
~~b) The color picker wont update the color of the text~~

----

#### What are the deprecated files?

As you can see, there is a **deprecated(components)** folder and a **deprecated.txt** file. These files were actually the first version of this project. Since it had a lot of bugs, I decided to scrape it and start again.

