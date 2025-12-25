export const schemas = {
  hero: {
    required: ["title", "subtitle"],
    // CTA remains optional by validation logic
    validate(data) {
      if (typeof data.title !== "string") {
        throw new Error("Hero.title must be a string");
      }

      if (typeof data.subtitle !== "string") {
        throw new Error("Hero.subtitle must be a string");
      }

      if (data.cta) {
        if (typeof data.cta !== "object") {
          throw new Error("Hero.cta must be an object");
        }

        if (typeof data.cta.label !== "string") {
          throw new Error("Hero.cta.label must be a string");
        }

        if (typeof data.cta.href !== "string") {
          throw new Error("Hero.cta.href must be a string");
        }
      }
    }
  },

  cta: {
  required: ["heading", "button"],
  validate(data) {
    if (typeof data.heading !== "string") {
      throw new Error("CTA.heading must be a string");
    }

    if (data.description && typeof data.description !== "string") {
      throw new Error("CTA.description must be a string");
    }

    if (!data.button || typeof data.button !== "object") {
      throw new Error("CTA.button must be an object");
    }

    if (typeof data.button.label !== "string") {
      throw new Error("CTA.button.label must be a string");
    }

    if (typeof data.button.href !== "string") {
      throw new Error("CTA.button.href must be a string");
    }
  }
},
};
