// Rotating CTA Messages
const ctaMessages = [
  "Get Your Free Quote!",
  "Call 715-214-4518",
  "Same-Week Service Available",
  "NFPA 96 Certified",
  "Emergency Cleaning Today",
  "Pass Your Inspection!",
  "Avoid Costly Fines",
  "Schedule Now",
  "Fire Marshal Approved"
];

let currentMessageIndex = 0;

// Rotate messages every 3 seconds with fade effect
function rotateMessage() {
  const desktopMessage = document.getElementById('cta-message');
  const mobileMessage = document.getElementById('cta-message-mobile');

  if (!desktopMessage || !mobileMessage) return;

  // Fade out
  desktopMessage.style.opacity = '0';
  mobileMessage.style.opacity = '0';

  setTimeout(() => {
    // Update message
    currentMessageIndex = (currentMessageIndex + 1) % ctaMessages.length;
    const newMessage = ctaMessages[currentMessageIndex];
    desktopMessage.textContent = newMessage;
    mobileMessage.textContent = newMessage;

    // Fade in
    desktopMessage.style.opacity = '1';
    mobileMessage.style.opacity = '1';
  }, 300);
}

// Add transition styles
function initCTA() {
  const desktopMessage = document.getElementById('cta-message');
  const mobileMessage = document.getElementById('cta-message-mobile');

  if (desktopMessage) {
    desktopMessage.style.transition = 'opacity 0.3s ease-in-out';
  }
  if (mobileMessage) {
    mobileMessage.style.transition = 'opacity 0.3s ease-in-out';
  }

  // Start rotating messages
  setInterval(rotateMessage, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCTA);
} else {
  initCTA();
}

// Modal Functions
function openContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal(event) {
  const modal = document.getElementById('contact-modal');
  if (modal && (!event || event.target === modal || event.type === 'keydown')) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeContactModal(event);
  }
});
