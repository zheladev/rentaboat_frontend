const fileRetrievalMixin = {
    created: () => {

    },
    methods: {
        getFilePath: (filePathWithLeadingDash) => {
            if(!filePathWithLeadingDash) return null;
            return `${process.env.VUE_APP_API_URL}${filePathWithLeadingDash.substring(1)}`;
        }
    }
}

export {
    fileRetrievalMixin
}