import React from 'react';
import {useTranslation} from "react-i18next";

const Error = () => {
    const {t} = useTranslation();
    return <h1>{t("error")}</h1>
}

export default Error;