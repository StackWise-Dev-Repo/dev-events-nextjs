"use client";
import React, { useState, Fragment, useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { registerUser } from '@/app/actions/user.subscribe';
import {
  authenticateUserSession,
  cleanUserSession,
} from "@/lib/sesson.cookies";


export default function SubscriptionForm() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<{success: boolean, message: string}>({success: false, message: ""});
  const [userSession, setUserSession] = useState<{session: boolean, name: string, email: string}>({session: false, name: "", email: ""});
  
  useEffect(() => {
    async function authenticateUser() {
        const authSession = await authenticateUserSession();
        setUserSession({
          session: true,
          name: authSession.name,
          email: authSession.email,
        });
    }

    authenticateUser();
  }, [])
  
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage({success: false, message: ""});

    const formData = new FormData(e.currentTarget);

    try {
        const userResponse = await registerUser(formData);

        setResponseMessage({
            success: userResponse.success,
            message: userResponse.message
        });

        if(userResponse.success) {
            e.currentTarget.reset();
            const authSession = await authenticateUserSession();
            setUserSession({
              session: true,
              name: authSession.name,
              email: authSession.email,
            });
        }
    } catch(error) {
      setResponseMessage({ success: false, message: "Something went wrong." });
    } finally {
        setIsLoading(false);
    }
  };

  const sessionHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const removeUserSession: any = await cleanUserSession();
    if(removeUserSession.success) {
        setUserSession(
          {
            session: false,
            name: "",
            email: ""
          }
        );
    }
  }

  return (
    <div className="form_container">
      {userSession.session ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg(--regal-navy) text-(--school-bus-yellow) border border-[var(--school-bus-yellow)]/30 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{userSession?.name.split(" ")[0].toUpperCase()}! You&apos;re subscribed! Check your inbox soon.</span>
          <button onClick={sessionHandler} className='button btn-primary'>Unsubscribe</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

          {responseMessage.success === false && responseMessage.message !== "" && (
            <div className="relative">
                <p className="my-2 text-red-700">{responseMessage.message}</p>
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="input-base pr-10 text-body-large!"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="developer@domain.com"
              className="input-base pr-10 text-body-large!"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full justify-center cursor-pointer py-3 text-body-large"
          >
            {isLoading ? (
                <Loader2 />
            ): (
                <Fragment>
                    <span>Subscribe Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Fragment>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
