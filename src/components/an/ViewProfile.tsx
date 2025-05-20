import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Avatar, AvatarImage } from "../ui/avatar";

type ProfileData = {
  name: string,
  email?: string,
  phone?: string,
  designation?: string,
  dob: string,
  doj: string,
  avatarUrl: string,
  status?: string
}
export function ViewProfile({
  name,
  email,
  phone,
  designation,
  dob,
  doj,
  avatarUrl,
  status,
}: ProfileData) {
  return (
    <Card className="w-300 h-45 p-4 items-start rounded-(--an-profile-border-radius) bg-(--an-profile-background) m-5 shadow-none border">
      <div className="flex">
        <div className="pt-2">
          <Avatar className="w-35 h-35 object-cover">
            <AvatarImage src={avatarUrl} alt={name} />
          </Avatar>
        </div>
        <div className="flex flex-col">
          <CardHeader>
            <div className="flex gap-5 items-start">
              <CardTitle className="text-(--an-profile-text-color) font-[urbanist] text-(length:--an-profile-title-text-size) font-medium">
                {name}
              </CardTitle>
              <div
                className={`rounded-4xl ${String(status).toLowerCase() === "true"
                    ? "bg-(--an-profile-active-bg) text-(--an-profile-active-bg)"
                    : "bg-red-500 text-red-500"
                  } flex justify-center items-center px-4 py-1 h-6`}
              >
                <span
                  className={`text-(length:--an-profile-active-text-size) font-medium ${String(status).toLowerCase() === "true"
                      ? "text-(--an-profile-active-bg)"
                      : "text-red-500"
                    }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-2">
            <form className="flex flex-col items-start gap-4">
              <div className="flex flex-start gap-8 self-stretch">
                <div className="flex flex-col gap-2 w-75 justify-center align-start">
                  <Label
                    htmlFor="email"
                    className="text-(--an-profile-label-color) font-[urbanist] text-(length:--an-profile-text-size) font-normal !important"
                  >
                    Email
                  </Label>
                  <p
                    id="email"
                    className="text-(--an-profile-text-color) font-[urbanist] text-(length:--an-profile-text-size) font-medium"
                  >
                    {email}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-75 justify-center align-start">
                  <Label
                    htmlFor="mobile"
                    className="text-(--an-profile-label-color) font-[urbanist] text-(length:--an-profile-text-size) font-normal !important"
                  >
                    Mobile
                  </Label>
                  <p
                    id="mobile"
                    className="text-(--an-profile-text-color) font-[urbanist] text-(length:--an-profile-text-size) font-medium"
                  >
                    {phone}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-75 justify-center align-start">
                  <Label
                    htmlFor="designation"
                    className="text-(--an-profile-label-color) font-[urbanist] text-(length:--an-profile-text-size) font-normal !important"
                  >
                    Designation
                  </Label>
                  <p
                    id="designation"
                    className="text-(--an-profile-text-color) font-[urbanist] text-(length:--an-profile-text-size) font-medium"
                  >
                    {designation}
                  </p>
                </div>
              </div>
              <div className="flex flex-start gap-8 self-stretch">
                <div className="flex flex-col gap-2 w-75 justify-center align-start">
                  <Label
                    htmlFor="birth"
                    className="text-(--an-profile-label-color) font-[urbanist] text-(length:--an-profile-text-size) font-normal !important"
                  >
                    Date Of Birth
                  </Label>
                  <p
                    id="email"
                    className="text-(--an-profile-text-color) font-[urbanist] text-(length:--an-profile-text-size) font-medium"
                  >
                    {dob}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-75 justify-center align-start">
                  <Label
                    htmlFor="joining"
                    className="text-(--an-profile-label-color) font-[urbanist] text-(length:--an-profile-text-size) font-normal !important"
                  >
                    Date Of Joining
                  </Label>
                  <p
                    id="mobile"
                    className="text-(--an-profile-text-color) font-[urbanist] text-(length:--an-profile-text-size) font-medium"
                  >
                    {doj}
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
