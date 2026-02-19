import { motion } from "motion/react";
import { Phone, Calendar, MessageSquare, Users, ClipboardList, RefreshCcw } from "lucide-react";

const workflows = [
  {
    icon: Phone,
    title: "Call Answering & Routing",
    whatItDoes: "AI answers incoming calls 24/7, handles basic inquiries, and routes complex cases.",
    whatStaffStopsDoing: "Answering repetitive questions during clinic hours.",
    whatClinicsGain: "Higher answer rates, fewer missed opportunities, better focus on in-person care.",
  },
  {
    icon: Calendar,
    title: "Booking / Rescheduling / Cancellations",
    whatItDoes: "Automatically schedules, reschedules, and cancels appointments based on availability.",
    whatStaffStopsDoing: "Manual calendar management and phone tag.",
    whatClinicsGain: "Reduced admin time, optimized schedules, fewer gaps.",
  },
  {
    icon: MessageSquare,
    title: "Missed-call → Text-back booking link",
    whatItDoes: "Sends SMS with direct booking link when calls are missed or after hours.",
    whatStaffStopsDoing: "Returning voicemails during business hours.",
    whatClinicsGain: "Convert more missed calls, extend access beyond clinic hours.",
  },
  {
    icon: Users,
    title: "Cancellation Backfill (Waitlist)",
    whatItDoes: "Notifies waitlist patients when slots open, fills gaps within hours.",
    whatStaffStopsDoing: "Manually calling through waitlists.",
    whatClinicsGain: "Protected revenue, maximized capacity utilization.",
  },
  {
    icon: ClipboardList,
    title: "Intake & Forms",
    whatItDoes: "Captures structured patient info during calls, populates intake forms.",
    whatStaffStopsDoing: "Re-entering data from paper forms or voicemails.",
    whatClinicsGain: "Cleaner data, faster check-ins, better patient prep.",
  },
  {
    icon: RefreshCcw,
    title: "Follow-ups & Reactivation",
    whatItDoes: "Automated reminders for follow-up appointments, reactivates dormant patients.",
    whatStaffStopsDoing: "Manual outreach campaigns.",
    whatClinicsGain: "Better continuity of care, improved patient retention.",
  },
];

export function Workflows() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#0B1630]/30 to-black relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#2D6BFF] font-semibold">
              AI WORKFLOWS
            </span>
          </div>
          <h2 className="text-white mb-6">
            Intelligent automation for every patient touchpoint
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-3xl mx-auto">
            Pre-configured AI agents that deploy in days, not months. Each workflow maintains full auditability and human oversight.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <workflow.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-semibold text-white mb-6 leading-tight">
                  {workflow.title}
                </h3>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-primary mb-1.5 font-semibold">
                      What it does
                    </div>
                    <p className="text-sm text-[#B7C0D6] leading-relaxed">
                      {workflow.whatItDoes}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-[#B7C0D6]/60 mb-1.5 font-semibold">
                      What staff stops doing
                    </div>
                    <p className="text-sm text-[#B7C0D6]/80 leading-relaxed">
                      {workflow.whatStaffStopsDoing}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-[#B7C0D6]/60 mb-1.5 font-semibold">
                      What clinics gain
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {workflow.whatClinicsGain}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}