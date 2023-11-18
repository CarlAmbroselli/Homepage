const baseColor = document.getElementById("baseColor");
baseColor.addEventListener("input", updateBaseColorDiv);
function updateBaseColorDiv(e) {
  document.getElementById('base-color-div').style = `background-color: ${e.target.value}`;
}

const referenceColor = document.getElementById("referenceColor");
referenceColor.addEventListener("input", updateBaseColorDiv);
function updateBaseColorDiv(e) {
  document.getElementById('reference-color-div').style = `background-color: ${e.target.value}`;
  if (isValidHex(e.target.value) && e.target.value.length === 7) {
    console.log('valid')
    convertColors()
  } else {
    console.log(e.target.value)
  }
}

function convertColors() {
  document.getElementById('result').style.display = "block"

  const baseColor = document.getElementById('baseColor').value;
  const refColor = document.getElementById('referenceColor').value;

  // Validate input
  if (!isValidHex(baseColor) || !isValidHex(refColor)) {
    alert('Please enter valid hex color codes');
    return;
  }

  // Convert hex to HSB
  const baseHSB = hexToHSB(baseColor);
  const refHSB = hexToHSB(refColor);

  // Copy hue from reference to base
  baseHSB.h = refHSB.h;

  // Convert back to hex RGB
  const resultColor = hsbToHex(baseHSB);

  // Display result
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<p>Result Color: </p>
            <div class="color-wrapper">
              <div style="background-color: ${resultColor}" id="reference-color-div" class="color-container">&nbsp;</div>
              <p>${resultColor} (copied to clipboard)</p>
            </div>`;

  copyToClipboard(resultColor)
}

function isValidHex(color) {
  const hexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  return hexRegex.test(color);
}

function hexToHSB(hex) {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  let brightness = max / 255;

  if (delta !== 0) {
    s = delta / max;

    switch (max) {
      case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }

    h /= 6;
  }

  return { h, s, b: brightness };
}

function hsbToHex(hsb) {
  const i = Math.floor(hsb.h * 6);
  const f = hsb.h * 6 - i;
  const p = hsb.b * (1 - hsb.s);
  const q = hsb.b * (1 - f * hsb.s);
  const t = hsb.b * (1 - (1 - f) * hsb.s);

  let r, g, b;
  switch (i % 6) {
    case 0: r = hsb.b, g = t, b = p; break;
    case 1: r = q, g = hsb.b, b = p; break;
    case 2: r = p, g = hsb.b, b = t; break;
    case 3: r = p, g = q, b = hsb.b; break;
    case 4: r = t, g = p, b = hsb.b; break;
    case 5: r = hsb.b, g = p, b = q; break;
  }

  return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}