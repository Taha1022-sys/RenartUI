
export const validateProductStructure = (product) => {
  const required = ['id', 'name', 'price'];
  const recommended = ['rating', 'images', 'colors'];
  
  const errors = [];
  const warnings = [];

  required.forEach(field => {
    if (!product.hasOwnProperty(field) || product[field] === null || product[field] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  recommended.forEach(field => {
    if (!product.hasOwnProperty(field)) {
      warnings.push(`Missing recommended field: ${field}`);
    }
  });

  if (product.price && typeof product.price !== 'number') {
    errors.push('Price should be a number');
  }

  if (product.rating && (typeof product.rating !== 'number' || product.rating < 0 || product.rating > 5)) {
    warnings.push('Rating should be a number between 0 and 5');
  }

  if (product.images && !Array.isArray(product.images)) {
    warnings.push('Images should be an array');
  }

  if (product.colors && !Array.isArray(product.colors)) {
    warnings.push('Colors should be an array');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateProductsArray = (products) => {
  if (!Array.isArray(products)) {
    return {
      isValid: false,
      errors: ['Response should be an array of products'],
      warnings: [],
      productValidations: []
    };
  }

  const productValidations = products.map((product, index) => ({
    index,
    product,
    validation: validateProductStructure(product)
  }));

  const allErrors = productValidations.flatMap(pv => 
    pv.validation.errors.map(error => `Product ${pv.index}: ${error}`)
  );

  const allWarnings = productValidations.flatMap(pv => 
    pv.validation.warnings.map(warning => `Product ${pv.index}: ${warning}`)
  );

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    productValidations,
    summary: {
      total: products.length,
      valid: productValidations.filter(pv => pv.validation.isValid).length,
      withWarnings: productValidations.filter(pv => pv.validation.warnings.length > 0).length
    }
  };
};

export const formatApiTestResults = (testResult) => {
  if (!testResult) return 'No test results available';

  const { success, status, data, error, message } = testResult;

  if (!success) {
    return `❌ Connection Failed (${status}): ${error || message}`;
  }

  if (!data) {
    return `✅ Connected (${status}) but no data received`;
  }

  const validation = validateProductsArray(data);
  
  let result = `✅ Connected (${status}) - ${validation.summary.total} products found\n`;
  
  if (validation.summary.valid === validation.summary.total) {
    result += `✅ All products have valid structure`;
  } else {
    result += `⚠️ ${validation.summary.valid}/${validation.summary.total} products have valid structure`;
  }

  if (validation.warnings.length > 0) {
    result += `\n⚠️ ${validation.warnings.length} warnings found`;
  }

  if (validation.errors.length > 0) {
    result += `\n❌ ${validation.errors.length} errors found`;
  }

  return result;
};