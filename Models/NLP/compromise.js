import nlp from "compromise";
import datePlugin from "compromise-dates";

nlp.plugin(datePlugin);
export const nlpe = (text) => {
  try {
    const doc = nlp(text);

    const regexPhone = /\b\d{10,12}\b/g;
    const regexYear = /\d{4}-\d{4}/g;
    const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
    const regexUrl =
      /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

    const phoneMatches = text.match(regexPhone);
    const yearMatches = text.match(regexYear);
    const emailMatches = text.match(regexEmail);
    const urlMatches = text.match(regexUrl);

    const name = doc.people();
    const places = doc.places();
    const organizations = doc.organizations();
    const phoneNumber =
      doc.phoneNumbers().out("array").length > 0
        ? doc.phoneNumbers().out("array")
        : phoneMatches;
    const email =
      doc.emails().text("normal").length > 0
        ? doc.emails().text("normal")
        : emailMatches;
    const url =
      doc.urls().out("array").length > 0 ? doc.urls().out("array") : urlMatches;
    const validity = yearMatches ? yearMatches : doc.dates().out("array");
    return {
      name,
      places,
      organizations,
      phoneNumber,
      email,
      url,
      validity,
    };
  } catch (err) {
    return err;
  }
};
