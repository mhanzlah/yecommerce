import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">

                    <h1 className="font-druk text-4xl leading-none">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-3 text-sm">
                        Join us to start shopping.
                    </p>

                </div>

                {/* Form */}
                <form className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-black transition"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-12 bg-black text-white rounded-xl text-sm uppercase hover:opacity-90 transition"
                    >
                        Create Account
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-black hover:underline"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default Signup;
