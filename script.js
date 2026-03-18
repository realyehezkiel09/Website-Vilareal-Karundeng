/* ═══════════════════════════════════════════════════════════
   script.js - Scientific Notation Scanner
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* DOM References */
const inputField = document.getElementById('input-field');
const btnScan = document.getElementById('btn-scan');
const resultSection = document.getElementById('result-section');
const resultInput = document.getElementById('result-input');
const resultDecimal = document.getElementById('result-decimal');
const resultBadge = document.getElementById('result-badge');
const verdictBox = document.getElementById('verdict-box');
const verdictText = document.getElementById('verdict-text');
const verdictStatus = document.getElementById('verdict-status');
const logoBrand = document.querySelector('.logo-brand');
const modalAbout = document.getElementById('modal-about');

/* ═══════════════════════════════════════════════════════════
   Core Logic
   ═══════════════════════════════════════════════════════════ */

function isScientificNotation(str) {
  const s = str.trim().replace(/\s/g, '');
  
  // Check pattern: ±a.be±n (where 1 ≤ |a| < 10)
  if (!/^-?[1-9](\.\d+)?[eE][+-]?\d+$/.test(s)) {
    return false;
  }
  
  // Validate coefficient range
  const coefficient = Math.abs(parseFloat(s.toLowerCase().split('e')[0]));
  return coefficient >= 1 && coefficient < 10;
}

function formatDecimal(str) {
  const s = str.trim().replace(/\s/g, '');
  const num = parseFloat(s);
  
  if (isNaN(num)) return null;
  
  // Very large or very small numbers
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(3);
  }
  
  return num.toLocaleString('id-ID');
}

/* ═══════════════════════════════════════════════════════════
   Main Scanner Function
   ═══════════════════════════════════════════════════════════ */

function runScanner() {
  const raw = inputField.value.trim();
  
  if (!raw) {
    hideResult();
    return;
  }
  
  const isValid = isScientificNotation(raw);
  
  // Update result display
  resultInput.textContent = raw;
  
  const decimal = formatDecimal(raw);
  resultDecimal.textContent = decimal ? `= ${decimal}` : '';
  
  // Update verdict
  verdictText.textContent = isValid ? 'YES' : 'NO';
  verdictStatus.textContent = isValid ? 'Valid Notation' : 'Invalid Notation';
  
  // Update badge
  if (isValid) {
    resultBadge.textContent = '✓ Valid';
    resultBadge.className = 'result-badge valid';
    verdictBox.className = 'verdict-box valid';
  } else {
    resultBadge.textContent = '✗ Invalid';
    resultBadge.className = 'result-badge invalid';
    verdictBox.className = 'verdict-box invalid';
  }
  
  // Show result
  showResult();
  
  // Show modal after delay
  setTimeout(() => {
    openAbout();
  }, 600);
}

function showResult() {
  resultSection.style.display = 'block';
  resultSection.style.opacity = '0';
  resultSection.style.animation = 'none';
  
  setTimeout(() => {
    resultSection.style.animation = 'fadeInScale 0.4s ease forwards';
  }, 10);
}

function hideResult() {
  resultSection.style.display = 'none';
}

/* ═══════════════════════════════════════════════════════════
   Example Chips
   ═══════════════════════════════════════════════════════════ */

function tryExample(value) {
  inputField.value = value;
  
  // Flash animation
  inputField.style.background = 'rgba(109, 151, 115, 0.1)';
  setTimeout(() => {
    inputField.style.background = 'transparent';
  }, 200);
  
  runScanner();
  inputField.focus();
}

/* ═══════════════════════════════════════════════════════════
   Modal Functions
   ═══════════════════════════════════════════════════════════ */

function openAbout() {
  modalAbout.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeAbout() {
  modalAbout.classList.remove('show');
  document.body.style.overflow = 'auto';
}

/* ═══════════════════════════════════════════════════════════
   Event Listeners
   ═══════════════════════════════════════════════════════════ */

// Keyboard support
inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    runScanner();
  }
});

// Logo brand click
logoBrand.addEventListener('click', openAbout);

// Modal overlay click
document.getElementById('modal-about').addEventListener('click', (e) => {
  if (e.target.id === 'modal-about') {
    closeAbout();
  }
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalAbout.classList.contains('show')) {
    closeAbout();
  }
});

// Clear result on new typing
inputField.addEventListener('input', () => {
  if (resultSection.style.display !== 'none') {
    hideResult();
  }
});

/* ═══════════════════════════════════════════════════════════
   Init
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  inputField.focus();
});