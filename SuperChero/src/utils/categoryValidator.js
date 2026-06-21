export function validateCategoryBody(body) {

  const errors = [];

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
        errors.push('El campo nombre es obligatorio y debe ser una cadena de texto no vacía.');
    }

    if (body.description && typeof body.description !== 'string') {
        errors.push('El campo descripción debe ser una cadena de texto.');
    }

    return errors;
}