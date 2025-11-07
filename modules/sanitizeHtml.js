export const sanitizeHtml = (value) => {
    return value.replaceAll(">", "&gt").replaceAll("<", "	&lt")
}