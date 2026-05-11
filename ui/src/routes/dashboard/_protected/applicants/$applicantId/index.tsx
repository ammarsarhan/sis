import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ProgressionChart from "@/components/dashboard/applicants/ProgressionChart";
import StrengthChart from "@/components/dashboard/applicants/StrengthChart";
import ApplicationsTable from "@/components/dashboard/applicants/ApplicationsTable";
import { parseType } from "@/lib/string";

export const Route = createFileRoute("/dashboard/_protected/applicants/$applicantId/")({
  component: RouteComponent,
});

const applicant = {
  id: "a-3",
  nameEn: "Layla Mahmoud",
  nameAr: "ليلى محمود",
  nationality: "US",
  phone: "+20 100 000 0003",
  dateOfBirth: new Date("2006-07-22"),
  gender: "FEMALE",
  passportNumber: "US-987654321",
  cityEn: "Alexandria",
  governorateEn: "Alexandria",
  application: {
    id: "app-3",
    code: "APP-2025-0003",
    status: "REJECTED",
    channel: "IN_PERSON",
    cycleId: "cycle-2025",
    faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
    department: { id: "d-3", nameEn: "General Medicine" },
    grade: 87,
    createdAt: new Date("2025-02-20T11:15:00"),
  },
  previousApplications: [
    {
      id: "app-prev-2",
      code: "APP-2024-0078",
      status: "REJECTED",
      channel: "IN_PERSON",
      cycleId: "cycle-2024",
      faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
      department: { id: "d-3", nameEn: "General Medicine" },
      grade: 82,
      createdAt: new Date("2024-02-18T10:00:00"),
    },
    {
      id: "app-prev-3",
      code: "APP-2023-0112",
      status: "REJECTED",
      channel: "IN_PERSON",
      cycleId: "cycle-2023",
      faculty: { id: "f-2", nameEn: "Faculty of Medicine" },
      department: { id: "d-3", nameEn: "General Medicine" },
      grade: 79,
      createdAt: new Date("2023-02-20T10:00:00"),
    },
  ],
  guardians: [
    {
      id: "g-4",
      name: "Sarah Johnson",
      phone: "+1 202 555 0101",
      relationship: "MOTHER",
      occupation: "Doctor",
      isPrimary: true,
    },
    {
      id: "g-5",
      name: "Ahmed Mahmoud",
      phone: "+20 100 111 0005",
      relationship: "GUARDIAN",
      occupation: "Lawyer",
      description: "Uncle",
      isPrimary: false,
    },
  ],
  createdAt: new Date("2025-02-20T11:00:00"),
};

// Merge current application (if any) with previous for the table
const applications = [
  ...(applicant.application ? [applicant.application] : []),
  ...applicant.previousApplications,
];

function RouteComponent() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 my-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                Applicants
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{applicant.nameEn}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col gap-y-0.5 mb-2 mx-6">
        <h1 className="text-xl font-medium">View Applicant</h1>
        <p className="text-gray-500 text-sm">
          Track applicant and link them to their submitted applications across
          admission cycles.
        </p>
      </div>
      <main className="px-6 py-4 space-y-6">
        <section className="p-6 rounded-xl bg-muted">
          <div className="flex flex-col gap-y-0.5 mb-4">
            <h1 className="font-medium">Applicant Details</h1>
            <p className="text-gray-500 text-[0.8125rem]">{applicant.nameEn.split(" ")[0]}'s applicant profile data, including name, address, date of birth, etc...</p>
          </div>
          <div className="grid grid-cols-4 gap-x-6 gap-y-5 text-sm">
            {[
              { label: "Full Name", value: applicant.nameEn },
              { label: "الإسم", value: applicant.nameAr },
              { label: "Applicant Code", value: applicant.id },
              {
                label: "Date of Birth",
                value: applicant.dateOfBirth.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
              },
              { label: "Nationality", value: applicant.nationality },
              {
                label: "Passport Number",
                value: applicant.passportNumber ?? "—",
              },
              { label: "Phone", value: applicant.phone },
              { label: "City", value: applicant.cityEn },
              { label: "Governorate", value: applicant.governorateEn },
              { label: "Gender", value: applicant.gender === "FEMALE" ? "Female" : "Male" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-y-0.5">
                <span className="text-gray-500 text-xs">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="p-6 rounded-xl bg-muted">
          <div className="flex flex-col gap-y-0.5 mb-6">
            <h1 className="font-medium">Guardians ({applicant.guardians.length})</h1>
            <p className="text-gray-500 text-[0.8125rem]">{applicant.nameEn.split(" ")[0]}'s provided emergency, primary, and secondary contacts/guardian data.</p>
          </div>
          {
            applicant.guardians.map(guardian => (
              <>
                <h2 className="font-medium text-sm mb-2.5">{parseType(guardian.relationship)}</h2>
                <div className="grid grid-cols-4 gap-x-6 gap-y-5 text-sm mb-6 last:mb-0">
                  {[
                    { label: "Name", value: guardian.name },
                    { label: "Primary Contact?", value: guardian.isPrimary ? "Yes" : "No" },
                    { label: "Occupation", value: guardian.occupation },
                    { label: "Phone", value: guardian.phone },
                    { label: "Additional Notes", value: guardian.description ? guardian.description : "None" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-y-0.5">
                      <span className="text-gray-500 text-xs">{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </>
            ))
          }
        </section>
        <section id="applications" className="my-8">
          <div className="flex flex-col gap-y-0.5 mb-5">
            <h1 className="font-medium text-[1.05rem]">Applications</h1>
            <p className="text-gray-500 text-[0.825rem]">{applicant.nameEn.split(" ")[0]} has submitted {applications.length} applications across all admission cycles. Here is what the data says:</p>
          </div>
          <div className="mb-6">
            <ApplicationsTable applications={applications} />
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <StrengthChart />
            <ProgressionChart />
          </div>
        </section>
      </main>
    </>
  );
}
