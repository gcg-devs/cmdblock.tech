import { prisma } from "@/lib/prisma";
import { TeamProfileForm } from "@/features/team-profile/components/team-profile-form";

export default async function TeamProfilePage() {
  const profile = await prisma.teamProfile.findFirst();

  return (
    <div className="max-w-6xl animate-reveal reveal-delay-1">
      <div className="mb-8">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
          Settings
        </p>
        <h2 className="font-sans text-2xl font-700 tracking-tight">
          <span className="text-muted-foreground font-mono text-lg font-normal">
            &gt;_{" "}
          </span>
          team_profile
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          This information appears on your invoice PDF header.
        </p>
      </div>

      <TeamProfileForm
        profile={
          profile
            ? {
                companyName: profile.companyName,
                tagline: profile.tagline,
                name: profile.name,
                address: profile.address,
                email: profile.email,
                phone: profile.phone,
              }
            : undefined
        }
      />
    </div>
  );
}
