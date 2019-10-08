const errorFormater = exception => {
  const message = exception.message;
  if (Array.isArray(message)) {
    const errors = [];

    for (const msg of message) {
      for (const constraint of Object.values(msg.constraints)) {
        errors.push(constraint);
      }
    }

    return errors;
  }

  return [message];
};

export default errorFormater;
