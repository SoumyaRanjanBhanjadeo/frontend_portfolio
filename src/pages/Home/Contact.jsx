import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Contact = () => {
    const { portfolioData } = useSelector((state) => state.root);

    const { contact } = portfolioData;
    return (
        <div>
            <SectionTitle title="Say Hello" />

            <div className="flex sm:flex-col items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-tertiary">{"{"}</p>
                    {Object.keys(contact).map((key, index) => (
                        key !== '_id' && <p key={index} className="ml-5">
                            <span className="text-tertiary">{key}: </span>
                            <span className="text-tertiary">{contact[key]}</span>
                        </p>
                    ))}
                    <p className="text-tertiary">{"}"}</p>
                </div>

                <div className="h-[400px]">
                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json" background="transparent" loop speed="1" direction="1" mode="normal" autoplay></lottie-player>
                </div>
            </div>
        </div>
    );
};

export default Contact;
