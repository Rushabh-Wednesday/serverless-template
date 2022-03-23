export const handleValidations = (options) => {
	const { error } = options.schema.validate(options.parameters);
	if (error) {
		throw new Error(error);
	}
};
