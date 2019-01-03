// function Picker(canvas) {
//     this.canvas = canvas;
//     this.framebuffer = null;
//     this.renderbuffer = null;

//     if (this.canvas) this.trackMouse();
// }

// Picker.prototype.configure = function() {
//     console.log("configuration");
//     var width = this.canvas.width;
//     var height = this.canvas.height;

//     //1. Init Picking Texture
//     this.texture = gl.createTexture();
//     gl.bindTexture(gl.TEXTURE_2D, this.texture);
//     gl.texImage2D(
//         gl.TEXTURE_2D,
//         0,
//         gl.RGBA,
//         width,
//         height,
//         0,
//         gl.RGBA,
//         gl.UNSIGNED_BYTE,
//         null
//     );

//     //2. Init Render Buffer
//     this.renderbuffer = gl.createRenderbuffer();
//     gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
//     gl.renderbufferStorage(
//         gl.RENDERBUFFER,
//         gl.DEPTH_COMPONENT16,
//         width,
//         height
//     );

//     //3. Init Frame Buffer
//     this.framebuffer = gl.createFramebuffer();
//     gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
//     gl.framebufferTexture2D(
//         gl.FRAMEBUFFER,
//         gl.COLOR_ATTACHMENT0,
//         gl.TEXTURE_2D,
//         this.texture,
//         0
//     );
//     gl.framebufferRenderbuffer(
//         gl.FRAMEBUFFER,
//         gl.DEPTH_ATTACHMENT,
//         gl.RENDERBUFFER,
//         this.renderbuffer
//     );

//     //4. Clean up
//     gl.bindTexture(gl.TEXTURE_2D, null);
//     gl.bindRenderbuffer(gl.RENDERBUFFER, null);
//     gl.bindFramebuffer(gl.FRAMEBUFFER, null);
// };

// // FIND function
// Picker.prototype.find = function(coords) {
//     var readout = new Uint8Array(1 * 1 * 4);
//     gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
//     gl.readPixels(coords.x, coords.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
//     gl.bindFramebuffer(gl.FRAMEBUFFER, null);
// };

// Picker.prototype.trackMouse = function() {
//     this.canvas.addEventListener("click", event => {
//         this.find({
//             x: event.clientX,
//             y: event.clientY
//         });
//     });
// };
