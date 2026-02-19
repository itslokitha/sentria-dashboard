import { motion, AnimatePresence } from "motion/react";
import { Building2, ShoppingBag, DollarSign, Home, Hotel, Briefcase, TrendingUp, Users, ArrowRight, CheckCircle2, Zap, Globe, Target, Stethoscope, Factory, GraduationCap, Landmark, Scale, Car, Monitor, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const solutions = [
  {
    icon: ShoppingBag,
    title: "Retail & E-Commerce",
    description: "Automate customer inquiries, order tracking, appointment bookings, and provide 24/7 support to enhance customer experience.",
    stats: { calls: "25K+", reduction: "45%", saved: "180hrs" },
    color: "#2D6BFF",
    image: "https://images.unsplash.com/photo-1764795850248-97a5e986b242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMG1vZGVybiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMTc3NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    benefits: [
      "24/7 order status updates",
      "Automated appointment scheduling",
      "Product availability inquiries",
      "Returns and exchange handling"
    ]
  },
  {
    icon: DollarSign,
    title: "Financial Services",
    description: "Streamline client onboarding, appointment scheduling, account inquiries, and compliance-focused communication workflows.",
    stats: { calls: "18K+", reduction: "42%", saved: "145hrs" },
    color: "#4A85FF",
    image: "https://images.unsplash.com/photo-1761735486587-bcac08b15c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYmFua2luZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZXxlbnwxfHx8fDE3NzAxNzc1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    benefits: [
      "Client meeting scheduling",
      "Account balance inquiries",
      "Document request automation",
      "Compliance-ready call logging"
    ]
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Qualify leads, schedule property viewings, follow up with prospects, and manage multi-property portfolios efficiently.",
    stats: { calls: "15K+", reduction: "40%", saved: "120hrs" },
    color: "#6B9EFF",
    image: "https://images.unsplash.com/photo-1764337362016-ae7923282ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzAxNzc1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    benefits: [
      "Property viewing scheduling",
      "Lead qualification and routing",
      "Availability updates",
      "Open house coordination"
    ]
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description: "Handle reservations, guest inquiries, special requests, and provide seamless check-in/check-out coordination.",
    stats: { calls: "30K+", reduction: "50%", saved: "220hrs" },
    color: "#8CB7FF",
    image: "https://images.unsplash.com/photo-1766163846502-bf26a2d40852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGhvc3BpdGFsaXR5JTIwbHV4dXJ5JTIwc2VydmljZXxlbnwxfHx8fDE3NzAxNzc1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    benefits: [
      "Room reservation management",
      "Guest service requests",
      "Special occasion coordination",
      "Concierge service automation"
    ]
  }
];

const implementationData = [
  { phase: "Week 1", progress: 25 },
  { phase: "Week 2", progress: 65 },
  { phase: "Week 3", progress: 90 },
  { phase: "Week 4", progress: 100 },
];

const outcomeData = [
  { name: "Answered", value: 987, color: "#2D6BFF" },
  { name: "Booked", value: 734, color: "#4A85FF" },
  { name: "Rescheduled", value: 142, color: "#6B9EFF" },
  { name: "Referred", value: 111, color: "#8CB7FF" },
];

const allIndustries = [
  { name: "Healthcare", icon: Stethoscope },
  { name: "Finance", icon: DollarSign },
  { name: "Retail", icon: ShoppingBag },
  { name: "Real Estate", icon: Home },
  { name: "Hospitality", icon: Hotel },
  { name: "Professional Services", icon: Briefcase },
  { name: "Manufacturing", icon: Factory },
  { name: "Education", icon: GraduationCap },
  { name: "Government", icon: Landmark },
  { name: "Legal", icon: Scale },
  { name: "Automotive", icon: Car },
  { name: "Technology", icon: Monitor }
];

const industryDetails: Record<string, {
  title: string;
  description: string;
  image: string;
  useCases: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  workflows: { title: string; description: string }[];
}> = {
  "Healthcare": {
    title: "Healthcare & Medical Services",
    description: "Transform patient communication with AI-powered voice assistants that handle appointment scheduling, prescription refills, test result notifications, and after-hours inquiries with HIPAA-compliant security.",
    image: "https://images.unsplash.com/photo-1766299892693-2370a8d47e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjB0ZWNobm9sb2d5JTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzAwNTIyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Family medicine clinics and primary care practices",
      "Specialist practices (cardiology, orthopedics, dermatology)",
      "Diagnostic centers and imaging facilities",
      "Multi-location healthcare networks",
      "Dental and vision care centers",
      "Mental health and telehealth services"
    ],
    features: [
      "HIPAA-compliant call recording and documentation",
      "Automated appointment booking and reminders",
      "Prescription refill request handling",
      "Insurance verification support",
      "Waitlist management and patient recall",
      "Multi-language support for diverse patient populations"
    ],
    metrics: [
      { label: "Call Volume Reduction", value: "40%" },
      { label: "No-Show Rate Decrease", value: "35%" },
      { label: "Patient Satisfaction", value: "96%" },
      { label: "Staff Time Saved", value: "120hrs/mo" }
    ],
    workflows: [
      { title: "Appointment Scheduling", description: "Patients call to book, reschedule, or cancel appointments 24/7 with real-time calendar integration" },
      { title: "Prescription Refills", description: "Automated collection of patient information and pharmacy details for refill requests" },
      { title: "Test Results", description: "Notify patients when results are ready and schedule follow-up consultations" },
      { title: "After-Hours Triage", description: "Route urgent calls to on-call providers while handling routine inquiries" }
    ]
  },
  "Finance": {
    title: "Financial Services & Banking",
    description: "Enhance client experience with secure AI voice automation for account inquiries, appointment scheduling, document requests, and compliance-ready call management across banking, wealth management, and insurance sectors.",
    image: "https://images.unsplash.com/photo-1761735486587-bcac08b15c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYmFua2luZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZXxlbnwxfHx8fDE3NzAxNzc1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Retail and commercial banking branches",
      "Wealth management and financial advisory firms",
      "Insurance agencies and brokerages",
      "Credit unions and community banks",
      "Mortgage lending operations",
      "Investment management firms"
    ],
    features: [
      "SOC 2 compliant secure call handling",
      "Client meeting and consultation scheduling",
      "Account balance and transaction inquiries",
      "Document collection and verification workflows",
      "Automated call logging for compliance",
      "Multi-channel integration (phone, web, mobile)"
    ],
    metrics: [
      { label: "Client Response Time", value: "90% faster" },
      { label: "Operational Costs", value: "42% reduction" },
      { label: "Client Satisfaction", value: "94%" },
      { label: "Compliance Accuracy", value: "99.8%" }
    ],
    workflows: [
      { title: "Account Inquiries", description: "Securely verify identity and provide balance, transaction history, and account status information" },
      { title: "Appointment Booking", description: "Schedule meetings with advisors, loan officers, or customer service representatives" },
      { title: "Document Requests", description: "Collect and route requests for statements, tax documents, or account changes" },
      { title: "Lead Qualification", description: "Screen and route new business inquiries to appropriate specialists" }
    ]
  },
  "Retail": {
    title: "Retail & E-Commerce",
    description: "Deliver exceptional customer service with AI assistants that handle order tracking, product inquiries, returns, and appointment scheduling for in-store services, all while reducing call center costs.",
    image: "https://images.unsplash.com/photo-1764795850248-97a5e986b242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMG1vZGVybiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMTc3NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "E-commerce and online retailers",
      "Brick-and-mortar retail chains",
      "Specialty boutiques and local shops",
      "Grocery and convenience stores",
      "Furniture and home goods showrooms",
      "Fashion and apparel retailers"
    ],
    features: [
      "24/7 order status and tracking updates",
      "Product availability and inventory checks",
      "Returns, exchanges, and refund processing",
      "In-store appointment scheduling (styling, consultations)",
      "Store locator and hours information",
      "Loyalty program enrollment and inquiries"
    ],
    metrics: [
      { label: "Customer Inquiries Handled", value: "25K+/mo" },
      { label: "Response Time", value: "Instant" },
      { label: "Customer Satisfaction", value: "95%" },
      { label: "Cost Savings", value: "45%" }
    ],
    workflows: [
      { title: "Order Tracking", description: "Customers receive real-time updates on order status, shipping, and delivery information" },
      { title: "Product Inquiries", description: "Check availability, sizes, colors, and specifications across all locations" },
      { title: "Returns Processing", description: "Initiate return requests, print labels, and schedule pickups automatically" },
      { title: "Appointment Booking", description: "Schedule personal shopping, styling consultations, or product demos" }
    ]
  },
  "Real Estate": {
    title: "Real Estate & Property Management",
    description: "Capture and qualify leads, schedule property viewings, coordinate inspections, and manage tenant inquiries with AI automation that never misses a potential client or opportunity.",
    image: "https://images.unsplash.com/photo-1764337362016-ae7923282ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBtb2Rlcm4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzAxNzc1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Residential real estate agencies",
      "Commercial property brokerages",
      "Property management companies",
      "Vacation rental operators",
      "Real estate investment firms",
      "New construction and development sales"
    ],
    features: [
      "24/7 lead capture and qualification",
      "Property viewing appointment scheduling",
      "Virtual tour booking and coordination",
      "Open house registration and reminders",
      "Tenant maintenance request intake",
      "Multi-property portfolio management"
    ],
    metrics: [
      { label: "Lead Response Time", value: "Under 60 sec" },
      { label: "Viewing Bookings", value: "40% increase" },
      { label: "Agent Productivity", value: "3x improvement" },
      { label: "Lead Conversion", value: "28% higher" }
    ],
    workflows: [
      { title: "Lead Qualification", description: "Capture buyer/renter preferences, budget, timeline, and route to appropriate agents" },
      { title: "Viewing Scheduling", description: "Coordinate property showings across multiple listings and agent calendars" },
      { title: "Open House Management", description: "Register attendees, send reminders, and collect feedback automatically" },
      { title: "Tenant Services", description: "Handle maintenance requests, lease inquiries, and payment questions" }
    ]
  },
  "Hospitality": {
    title: "Hospitality & Travel Services",
    description: "Elevate guest experiences with AI concierge services that manage reservations, special requests, check-in/out coordination, and local recommendations while reducing front desk workload.",
    image: "https://images.unsplash.com/photo-1766163846502-bf26a2d40852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGhvc3BpdGFsaXR5JTIwbHV4dXJ5JTIwc2VydmljZXxlbnwxfHx8fDE3NzAxNzc1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Hotels and resorts",
      "Vacation rentals and Airbnb properties",
      "Bed and breakfasts",
      "Event venues and conference centers",
      "Restaurants and dining establishments",
      "Travel agencies and tour operators"
    ],
    features: [
      "Reservation booking and modifications",
      "Guest service and amenity requests",
      "Check-in/out coordination and reminders",
      "Dining reservations and recommendations",
      "Special occasion planning (anniversaries, birthdays)",
      "Multilingual guest support"
    ],
    metrics: [
      { label: "Guest Inquiries Handled", value: "30K+/mo" },
      { label: "Front Desk Workload", value: "50% reduction" },
      { label: "Guest Satisfaction", value: "97%" },
      { label: "Upsell Revenue", value: "22% increase" }
    ],
    workflows: [
      { title: "Reservation Management", description: "Book, modify, and cancel reservations with real-time availability checks" },
      { title: "Guest Requests", description: "Handle room service, housekeeping, maintenance, and amenity requests" },
      { title: "Concierge Services", description: "Provide local recommendations, transportation, and activity bookings" },
      { title: "Event Coordination", description: "Manage group bookings, meetings, and special event planning" }
    ]
  },
  "Professional Services": {
    title: "Professional Services",
    description: "Streamline client communications for law firms, accounting practices, consulting agencies, and other professional services with intelligent appointment scheduling and intake automation.",
    image: "https://images.unsplash.com/photo-1758524056096-6bedf35a33f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlcyUyMGJ1c2luZXNzJTIwY29uc3VsdGluZ3xlbnwxfHx8fDE3NzAxNzc3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Management and strategy consulting firms",
      "Accounting and tax advisory practices",
      "Marketing and advertising agencies",
      "IT consulting and services",
      "Human resources consultancies",
      "Business coaching and training"
    ],
    features: [
      "Client consultation scheduling",
      "New client intake and onboarding",
      "Project status inquiries",
      "Document collection workflows",
      "Billing and invoice questions",
      "Referral tracking and routing"
    ],
    metrics: [
      { label: "Scheduling Efficiency", value: "85% faster" },
      { label: "Client Response Time", value: "Under 2 min" },
      { label: "Administrative Costs", value: "38% reduction" },
      { label: "Client Retention", value: "92%" }
    ],
    workflows: [
      { title: "Consultation Booking", description: "Schedule initial consultations and follow-up meetings with appropriate specialists" },
      { title: "Client Intake", description: "Collect information for new engagements and route to appropriate teams" },
      { title: "Status Updates", description: "Provide project updates and timeline information to clients" },
      { title: "Resource Scheduling", description: "Coordinate internal resources and client meetings across teams" }
    ]
  },
  "Manufacturing": {
    title: "Manufacturing & Industrial",
    description: "Optimize supplier communications, order management, and customer support with AI voice automation designed for complex manufacturing operations and supply chain coordination.",
    image: "https://images.unsplash.com/photo-1764835994645-3faa2c40f708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwZmFjdG9yeSUyMGluZHVzdHJpYWwlMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc3MDE3Nzc5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Industrial equipment manufacturers",
      "Consumer goods production",
      "Automotive parts and components",
      "Food and beverage manufacturing",
      "Chemical and pharmaceutical production",
      "Electronics and technology assembly"
    ],
    features: [
      "Order status and tracking inquiries",
      "Supplier coordination and scheduling",
      "Quality control reporting intake",
      "Inventory availability checks",
      "Shipping and logistics coordination",
      "Technical support routing"
    ],
    metrics: [
      { label: "Order Inquiry Response", value: "Instant" },
      { label: "Supplier Coordination", value: "60% faster" },
      { label: "Customer Support Costs", value: "44% reduction" },
      { label: "Order Accuracy", value: "98%" }
    ],
    workflows: [
      { title: "Order Management", description: "Track production status, shipping updates, and delivery schedules" },
      { title: "Supplier Coordination", description: "Schedule deliveries, confirm specifications, and manage purchase orders" },
      { title: "Quality Reporting", description: "Collect and route quality issues and defect reports to appropriate teams" },
      { title: "Customer Support", description: "Handle product inquiries, specifications, and technical support requests" }
    ]
  },
  "Education": {
    title: "Education & Training",
    description: "Enhance student and parent communication with AI assistants that handle enrollment inquiries, campus tours, course registration, and administrative questions for educational institutions of all sizes.",
    image: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwbW9kZXJufGVufDF8fHx8MTc3MDE3Nzc5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Universities and colleges",
      "K-12 schools and districts",
      "Professional training centers",
      "Online education platforms",
      "Tutoring and test prep services",
      "Language learning schools"
    ],
    features: [
      "Enrollment and admissions inquiries",
      "Campus tour scheduling",
      "Course registration support",
      "Financial aid information",
      "Parent-teacher conference booking",
      "Event registration and coordination"
    ],
    metrics: [
      { label: "Inquiry Response Time", value: "Immediate" },
      { label: "Enrollment Conversion", value: "32% increase" },
      { label: "Administrative Time Saved", value: "150hrs/mo" },
      { label: "Parent Satisfaction", value: "93%" }
    ],
    workflows: [
      { title: "Admissions Support", description: "Answer prospective student questions and schedule campus visits" },
      { title: "Course Registration", description: "Assist with course selection, prerequisites, and schedule conflicts" },
      { title: "Parent Communication", description: "Schedule conferences, provide updates, and answer administrative questions" },
      { title: "Event Management", description: "Coordinate orientations, open houses, and campus events" }
    ]
  },
  "Government": {
    title: "Government & Public Sector",
    description: "Improve citizen services with accessible AI voice automation for permit applications, service requests, appointment scheduling, and information dissemination across municipal, state, and federal agencies.",
    image: "https://images.unsplash.com/photo-1768353083126-be88cda590ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBwdWJsaWMlMjBzZWN0b3J8ZW58MXx8fHwxNzcwMTc3Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Municipal and city governments",
      "State and federal agencies",
      "Public utilities and services",
      "DMV and licensing departments",
      "Parks and recreation departments",
      "Public health departments"
    ],
    features: [
      "Permit application status inquiries",
      "Public service request intake (311)",
      "Appointment scheduling for services",
      "Multilingual citizen support",
      "Emergency notification routing",
      "Information dissemination and FAQs"
    ],
    metrics: [
      { label: "Citizen Inquiries Handled", value: "50K+/mo" },
      { label: "Wait Time Reduction", value: "75%" },
      { label: "Service Accessibility", value: "24/7" },
      { label: "Cost Per Interaction", value: "82% lower" }
    ],
    workflows: [
      { title: "Service Requests", description: "Intake 311 calls for potholes, streetlights, waste collection, and other services" },
      { title: "Permit Applications", description: "Provide status updates on building, business, and special event permits" },
      { title: "Appointment Scheduling", description: "Book appointments for DMV, passport services, and inspections" },
      { title: "Information Services", description: "Answer FAQs about hours, locations, requirements, and procedures" }
    ]
  },
  "Legal": {
    title: "Legal Services",
    description: "Enhance law firm operations with AI assistants that manage client intake, consultation scheduling, case status inquiries, and document collection while maintaining attorney-client privilege.",
    image: "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBvZmZpY2UlMjBsZWdhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAxNzc3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "Law firms (all practice areas)",
      "Solo practitioners",
      "Legal aid organizations",
      "Corporate legal departments",
      "Mediation and arbitration services",
      "Legal document preparation services"
    ],
    features: [
      "Confidential client intake",
      "Consultation scheduling with attorneys",
      "Case status and timeline updates",
      "Document collection and routing",
      "Court date reminders",
      "Conflict checking automation"
    ],
    metrics: [
      { label: "Client Intake Efficiency", value: "70% faster" },
      { label: "Scheduling Accuracy", value: "99%" },
      { label: "Missed Appointments", value: "65% reduction" },
      { label: "Client Satisfaction", value: "91%" }
    ],
    workflows: [
      { title: "Client Intake", description: "Securely collect initial case information and conflict check details" },
      { title: "Consultation Booking", description: "Schedule consultations with appropriate attorneys based on practice area" },
      { title: "Case Updates", description: "Provide clients with case status, next steps, and timeline information" },
      { title: "Document Management", description: "Coordinate collection and signing of legal documents" }
    ]
  },
  "Automotive": {
    title: "Automotive & Dealerships",
    description: "Drive sales and service efficiency with AI voice automation for test drive scheduling, service appointments, parts inquiries, and customer follow-up across dealerships and auto service centers.",
    image: "https://images.unsplash.com/photo-1643142314913-0cf633d9bbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwY2FyJTIwZGVhbGVyc2hpcCUyMHNob3dyb29tfGVufDF8fHx8MTc3MDE3Nzc5NHww&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "New and used car dealerships",
      "Auto service and repair centers",
      "Parts suppliers and retailers",
      "Auto body and collision repair",
      "Fleet management services",
      "Car rental agencies"
    ],
    features: [
      "Test drive appointment scheduling",
      "Service appointment booking and reminders",
      "Parts availability and order status",
      "Vehicle inventory inquiries",
      "Trade-in value estimates",
      "Service status updates"
    ],
    metrics: [
      { label: "Test Drive Bookings", value: "45% increase" },
      { label: "Service No-Shows", value: "55% reduction" },
      { label: "Lead Response Time", value: "Under 60 sec" },
      { label: "Customer Retention", value: "38% improvement" }
    ],
    workflows: [
      { title: "Sales Inquiries", description: "Answer questions about inventory, pricing, financing, and schedule test drives" },
      { title: "Service Scheduling", description: "Book maintenance, repairs, and inspections with automated reminders" },
      { title: "Parts Orders", description: "Check availability, provide pricing, and process parts orders" },
      { title: "Follow-up", description: "Post-purchase and post-service satisfaction checks and referral requests" }
    ]
  },
  "Technology": {
    title: "Technology & SaaS",
    description: "Scale customer support and sales operations with AI voice automation that handles product inquiries, demo scheduling, technical support routing, and onboarding for tech companies and SaaS platforms.",
    image: "https://images.unsplash.com/photo-1765728617352-895327fcf036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwbW9kZXJuJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MDE3Nzc5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    useCases: [
      "SaaS and cloud service providers",
      "Software development companies",
      "IT services and consulting",
      "Cybersecurity firms",
      "Managed service providers (MSPs)",
      "Technology startups"
    ],
    features: [
      "Product demo scheduling",
      "Trial and onboarding support",
      "Technical support ticket creation",
      "Account and billing inquiries",
      "Feature request collection",
      "Multi-tier support routing"
    ],
    metrics: [
      { label: "Demo Bookings", value: "52% increase" },
      { label: "Support Response Time", value: "90% faster" },
      { label: "Support Costs", value: "48% reduction" },
      { label: "Customer Satisfaction", value: "94%" }
    ],
    workflows: [
      { title: "Sales Qualification", description: "Qualify leads, answer product questions, and schedule demos with sales team" },
      { title: "Onboarding Support", description: "Guide new users through setup and initial configuration" },
      { title: "Technical Support", description: "Collect issue details and route to appropriate support tiers" },
      { title: "Account Management", description: "Handle billing questions, upgrades, and feature inquiries" }
    ]
  }
};

export function SolutionsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const handleIndustryClick = (industryName: string) => {
    setSelectedIndustry(industryName);
    // Smooth scroll to details section
    setTimeout(() => {
      document.getElementById('industry-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1630]/40 to-black"></div>
          <img 
            src="https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWxzJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzcwMDg0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Business Professionals"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-block mb-4 md:mb-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">
                SOLUTIONS FOR EVERY INDUSTRY
              </span>
            </div>
            <h1 className="text-white mb-4 md:mb-6 max-w-4xl mx-auto text-3xl md:text-5xl lg:text-6xl px-4">
              AI Voice Automation Across All Business Sectors
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed px-4">
              Industry-specific workflows designed for your unique needs, deployed in 14 days across 12 global sectors.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20">
            {[
              { label: "Industries Served", value: "12+", icon: Building2 },
              { label: "System Uptime", value: "99.9%", icon: Zap },
              { label: "Avg Response Time", value: "<2s", icon: TrendingUp },
              { label: "AI Accuracy", value: "98%", icon: Target },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6"
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2 md:mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-[#B7C0D6]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Industries Grid */}
      <section className="py-12 md:py-20 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-4xl px-4">Trusted Across Industries</h2>
            <p className="text-base md:text-xl text-[#B7C0D6] max-w-3xl mx-auto px-4">
              SENTRIA adapts to the unique communication needs of every sector. Click any industry to learn more.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {allIndustries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleIndustryClick(industry.name)}
                  className={`bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border rounded-xl p-4 md:p-8 transition-all group cursor-pointer flex flex-col items-center text-center min-h-[140px] md:min-h-[200px] justify-center ${
                    selectedIndustry === industry.name 
                      ? 'border-primary shadow-lg shadow-primary/20 scale-105' 
                      : 'border-white/10 hover:border-primary/50 active:scale-95'
                  }`}
                >
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 transition-all ${
                    selectedIndustry === industry.name
                      ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30'
                      : 'bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30'
                  }`}>
                    <IconComponent className={`w-7 h-7 md:w-10 md:h-10 transition-colors ${
                      selectedIndustry === industry.name 
                        ? 'text-primary' 
                        : 'text-white group-hover:text-primary'
                    }`} />
                  </div>
                  <div className={`text-sm md:text-lg font-semibold transition-colors ${
                    selectedIndustry === industry.name 
                      ? 'text-primary' 
                      : 'text-white group-hover:text-primary'
                  }`}>
                    {industry.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Details Section */}
      <AnimatePresence mode="wait">
        {selectedIndustry && industryDetails[selectedIndustry] && (
          <motion.section
            id="industry-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 md:py-20 bg-gradient-to-b from-[#0B1630]/20 to-transparent relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
            
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Close Button */}
              <div className="flex justify-end mb-4 md:mb-6">
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[#B7C0D6] hover:text-white transition-colors text-sm"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30 mb-4 md:mb-6">
                    {(() => {
                      const IconComponent = allIndustries.find(i => i.name === selectedIndustry)?.icon;
                      return IconComponent ? <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-primary" /> : null;
                    })()}
                  </div>
                  <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl px-4">{industryDetails[selectedIndustry].title}</h2>
                  <p className="text-base md:text-xl text-[#B7C0D6] max-w-4xl mx-auto leading-relaxed px-4">
                    {industryDetails[selectedIndustry].description}
                  </p>
                </div>

                {/* Hero Image */}
                <div className="mb-8 md:mb-16 rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={industryDetails[selectedIndustry].image}
                    alt={industryDetails[selectedIndustry].title}
                    className="w-full h-[250px] md:h-[400px] object-cover"
                  />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
                  {industryDetails[selectedIndustry].metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">{metric.value}</div>
                      <div className="text-xs md:text-sm text-[#B7C0D6]">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
                  {/* Use Cases */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Common Use Cases</h3>
                    <div className="space-y-3">
                      {industryDetails[selectedIndustry].useCases.map((useCase, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base text-[#B7C0D6]">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Key Features</h3>
                    <div className="space-y-3">
                      {industryDetails[selectedIndustry].features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm md:text-base text-[#B7C0D6]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Workflows */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">Typical Workflows</h3>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {industryDetails[selectedIndustry].workflows.map((workflow, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold text-sm md:text-base">{i + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{workflow.title}</h4>
                            <p className="text-xs md:text-sm text-[#B7C0D6]">{workflow.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <div className="text-center mt-8 md:mt-12">
                  <Button 
                    onClick={() => {
                      onNavigate?.('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-primary hover:bg-primary/90 group text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
                  >
                    Request Industry-Specific Demo
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Implementation Process */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-4">
              Go live in 14 days
            </h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-2xl mx-auto px-4">
              Rapid deployment with zero disruption to your existing workflows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              {[
                { week: "Week 1", title: "Discovery & Configuration", desc: "System integration and workflow mapping" },
                { week: "Week 2", title: "AI Training", desc: "Custom model training on your data" },
                { week: "Week 3", title: "Testing & Refinement", desc: "Pilot testing with staff feedback" },
                { week: "Week 4", title: "Full Deployment", desc: "Go-live with 24/7 support" },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gradient-to-r from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-sm md:text-base">{i + 1}</span>
                    </div>
                    <div>
                      <div className="text-xs text-primary mb-1">{phase.week}</div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{phase.title}</h3>
                      <p className="text-xs md:text-sm text-[#B7C0D6]">{phase.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8"
            >
              <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Implementation Progress</h3>
              <div className="w-full h-[250px] md:h-[320px]" style={{ minHeight: '250px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={implementationData}>
                    <XAxis dataKey="phase" stroke="#B7C0D6" fontSize={10} tick={{ fontSize: 10 }} />
                    <YAxis stroke="#B7C0D6" fontSize={10} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="progress" fill="#2D6BFF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-white font-semibold">Zero-disruption deployment</span>
                </div>
                <p className="text-xs md:text-sm text-[#B7C0D6] ml-6 md:ml-8">
                  Your team continues normal operations while we handle the technical setup.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}