let config;
let convertButton;
let originalTextarea;
let parsedTextarea;
let editRulesModal;
let openModalButton;
let span;
let rulesText;

function convert() {
  const original = originalTextarea.value;
  let parsed = 'Error!';

  parsed = original.toLocaleString();

  const convertingRules = JSON.parse(config);
  const colors = convertingRules.colors;
  const baseRules = convertingRules.baseRules;
  const coloringRules = convertingRules.coloringRules;

  baseRules.map((current) => {
    parsed = parsed.replaceAll(current[0], current[1]);
  });

  coloringRules.map((rule) => {
    rule.words.map((wordToColor) => {
      const newWord = `[color:#${colors[rule.color]}]${wordToColor}[/color]`;
      parsed = parsed.replaceAll(wordToColor, newWord);
    });
  });

  parsedTextarea.value = parsed;
}

function openModal() {
  editRulesModal.style.display = 'block';
}

function closeModal() {
  editRulesModal.style.display = 'none';
  config = rulesText.value;
}

window.addEventListener('DOMContentLoaded', (event) => {
  convertButton = document.getElementById('convertButton');
  originalTextarea = document.getElementById('originalText');
  parsedTextarea = document.getElementById('parsedText');
  editRulesModal = document.getElementById('editRulesModal');
  openModalButton = document.getElementById('openModalBtn');
  span = document.getElementsByClassName('close')[0];
  rulesText = document.getElementById('rulesText');

  convertButton.addEventListener('click', convert);
  openModalButton.addEventListener('click', openModal);
  span.addEventListener('click', closeModal);

  config = rulesText.value;
});
