// Listen for product selections from the 1build widget
document.addEventListener('DOMContentLoaded', function() {
    // Check if onebuild is defined after script loads
    const checkOneBuild = setInterval(() => {
        if (window.onebuild) {
            clearInterval(checkOneBuild);
            setupOneBuilderListeners();
        }
    }, 100);
});

function setupOneBuilderListeners() {
    // Listen for product selection event
    window.onebuild.on('sourceSelected', function(source) {
        displayProductDetails(source);
    });
    
    // Listen for widget close event
    window.onebuild.on('close', function() {
        console.log('Widget closed');
    });
}

// Display selected product details
function displayProductDetails(product) {
    const detailsContainer = document.getElementById('product-details');
    
    // Create a product card
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Format money values
    const materialCost = (product.materialRateUsdCents / 100).toFixed(2);
    const laborCost = (product.laborRateUsdCents / 100).toFixed(2);
    const totalCost = (product.calculatedUnitRateUsdCents / 100).toFixed(2);
    
    // Create product card content
    card.innerHTML = `
        <div class="product-name">${product.name}</div>
        <div class="product-info">
            <span>ID:</span> <span>${product.id}</span>
            <span>Type:</span> <span>${product.sourceType}</span>
            <span>Unit:</span> <span>${product.uom}</span>
            <span>Material Cost:</span> <span>$${materialCost}</span>
            <span>Labor Cost:</span> <span>$${laborCost}</span>
            <span>Total Cost:</span> <span>$${totalCost}</span>
            <span>Category:</span> <span>${product.categoryPath.join(' > ')}</span>
        </div>
        <div class="description">
            <p>${product.description}</p>
        </div>
    `;
    
    // Add to the container
    detailsContainer.appendChild(card);
}
