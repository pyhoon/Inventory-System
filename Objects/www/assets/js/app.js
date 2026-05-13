/*!
 * Pakai Casual Framework B4J Project Template v6.90 by @pyhoon (https://github.com/pyhoon/pakai-casual-b4j)
 * Copyright (c) 2026 Poon Yip Hoon (Aeric)
 * Licensed under MIT (https://github.com/pyhoon/pakai-casual-b4j/blob/main/LICENSE)
 */
document.addEventListener('entity:changed', (e) => {
    const { entity, action, message, status } = e.detail || {};
    
    // Close the modal via custom event (listened by Alpine in products.html/categories.html)
    document.dispatchEvent(new CustomEvent('close-modal'));
    
    // Show toast
    showToast(message || `${entity} ${action} successful`, status || 'success');
    
    console.info(`[HTMX] ${entity} ${action} completed`);
});

// Global error handler
document.addEventListener('htmx:responseError', function (event) {
    showToast('Network error occurred. Please try again.', 'danger');
    console.error('Network error occurred.');
});

/**
 * Show a toast notification using Tailwind CSS
 * @param {string} message 
 * @param {string} status (success, info, warning, danger)
 */
function showToast(message, status) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Map status to Tailwind colors
    let bgColor = 'bg-emerald-500';
    let icon = 'bi-check-circle';
    
    if (status === 'danger') {
        bgColor = 'bg-rose-500';
        icon = 'bi-exclamation-octagon';
    } else if (status === 'warning') {
        bgColor = 'bg-amber-500';
        icon = 'bi-exclamation-triangle';
    } else if (status === 'info') {
        bgColor = 'bg-sky-500';
        icon = 'bi-info-circle';
    }

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3 px-4 py-3 text-white rounded-xl shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 ${bgColor}`;
    toast.innerHTML = `
        <i class="bi ${icon} text-lg"></i>
        <p class="font-medium text-sm">${message}</p>
        <button class="ml-auto text-white/80 hover:text-white transition-colors">
            <i class="bi bi-x-lg"></i>
        </button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    // Close button logic
    toast.querySelector('button').onclick = () => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    };

    // Auto remove
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}