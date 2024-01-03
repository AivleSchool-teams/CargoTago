import axios from "axios";

const FileUploadService = {
    upload: async (file) => {
        let formData = new FormData();

        for (const element of file) {
            formData.append("file", element);
        }

        return await axios.post("/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default FileUploadService;
