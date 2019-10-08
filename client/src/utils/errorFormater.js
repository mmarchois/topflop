const errorFormater = exception => {
  if (Array.isArray(exception.message)) {
    const errors = [];

    for (const message of exception.message) {
      Object.values(message.constraints).map(constraint => {
        errors.push(constraint);
      });
    }

    return errors;
  }

  return [exception.message];
};

export default errorFormater;
