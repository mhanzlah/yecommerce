import { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "inquiry",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", form);
        alert("Message sent successfully!");
        setForm({
            name: "",
            email: "",
            subject: "inquiry",
            message: "",
        });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">

                    <h1 className="font-druk text-4xl leading-none">
                        Contact
                    </h1>

                    <p className="text-gray-500 mt-3 text-sm">
                        Send an inquiry or place an order request.
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition"
                            required
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm mb-2">
                            Type
                        </label>

                        <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition bg-white"
                        >
                            <option value="inquiry">General Inquiry</option>
                            <option value="order">Order Issue</option>
                            <option value="support">Support</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm mb-2">
                            Message
                        </label>

                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className="w-full h-28 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black transition resize-none"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-12 bg-black text-white rounded-xl text-sm uppercase hover:opacity-90 transition"
                    >
                        Send Message
                    </button>

                </form>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-gray-500">
                    We usually respond within 24–48 hours.
                </p>

            </div>

        </div>
    );
};

export default Contact;