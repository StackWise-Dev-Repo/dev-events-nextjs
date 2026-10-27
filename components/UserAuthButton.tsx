"use client";

import { useState, useEffect, Fragment } from "react";
import {
  authenticateUserSession,
  cleanUserSession,
} from "@/lib/sesson.cookies";
import { UserCircle, Loader2, ArrowRight } from "lucide-react";
import { validateCurrentUser } from "@/app/actions/user.subscribe";
import { useUserStore } from "@/store/useUserStore";

export default function UserAuthButton() {

  const {userSession, setUserSession, isLoading, setIsLoading} = useUserStore();

  const [formTrigger, setFormTrigger] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{
    success: boolean;
    message: string;
  }>({ success: false, message: "" });

  useEffect(() => {
    async function authenticateUser() {
      const authSession = await authenticateUserSession();
      if (authSession && authSession.email) {
        setUserSession({
          session: true,
          name: authSession.name,
          email: authSession.email,
        });
      } else {
        setUserSession({
          session: false,
          name: "",
          email: "",
        });
      }
    }

    authenticateUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage({ success: false, message: "" });

    const formData = new FormData(e.currentTarget);

    try {
        const validateUser = await validateCurrentUser(formData);
        setResponseMessage(validateUser);
        if (validateUser.success) {
          const authSession = await authenticateUserSession();
          setUserSession({session: true, name: authSession.name, email: authSession.email});
        }
    } catch (error: any) {
      setResponseMessage({ success: false, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <button
        className="flex flex-col gap-1 items-center cursor-pointer relative"
        onClick={() => setFormTrigger(!formTrigger)}
      >
        <UserCircle width={30} height={30} color="#ffc300" />
        {userSession.session && (
          <span className="text-[10px] text-(--school-bus-yellow)">
            {userSession.name.split(" ")[0].toUpperCase()}
          </span>
        )}
      </button>

      {/* Popup / Dropdown Form when clicked and user is NOT logged in */}
      {formTrigger && !userSession.session && (
        <div className="absolute top-0 right-4 mt-12 w-72 bg-(--bg-surface) border border-(--border-color) rounded-xl p-4 shadow-2xl z-50">
          <div className="mb-3">
            <h4 className="text-sm font-bold text-(--text-heading) mb-2">
              Quick Sign In / Register
            </h4>
            <p className="text-xs text-(--text-muted)">
              Enter your email to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {responseMessage.message !== "" && (
              <p
                className={`text-xs ${responseMessage.success ? "text-emerald-400" : "text-red-400"}`}
              >
                {responseMessage.message}
              </p>
            )}

            <input
              type="email"
              name="email"
              placeholder="developer@domain.com"
              className="w-full bg-(--bg-main) border border-(--border-color) rounded-lg px-3 py-3 text-xs text-(--text-heading) outline-none focus:border-(--school-bus-yellow)"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-xs justify-center cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Fragment>
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Fragment>
              )}
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
}
