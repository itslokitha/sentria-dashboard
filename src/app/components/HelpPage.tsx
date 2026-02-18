import { 
  HelpCircle, Book, MessageCircle, Mail, Phone, FileText, Video, Search, 
  ExternalLink, ChevronRight, ChevronDown, Send, X, Check, Clock, 
  AlertCircle, Zap, Shield, Settings, Users, TrendingUp, Database,
  Star, ThumbsUp, MessageSquare, Loader2, Sparkles, Bot
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  date: string;
  priority: 'low' | 'medium' | 'high';
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'agent';
  message: string;
  timestamp: string;
  quickReplies?: string[];
}

interface ConversationContext {
  topic: string | null;
  lastIntent: string | null;
  userNeedsClarification: boolean;
  askedAbout: string[];
  problemSolved: boolean;
}

// Enhanced SENTRIA AI with personality and context
const generateDynamicResponse = (
  userMessage: string, 
  conversationHistory: ChatMessage[],
  context: ConversationContext
): { message: string; quickReplies?: string[]; updateContext: Partial<ConversationContext> } => {
  
  const msg = userMessage.toLowerCase();
  let response = '';
  let quickReplies: string[] = [];
  let updateContext: Partial<ConversationContext> = {};

  // Analyze conversation patterns
  const isFirstMessage = conversationHistory.length <= 1;
  const previousUserMessages = conversationHistory.filter(m => m.sender === 'user');
  const hasAskedMultipleQuestions = previousUserMessages.length > 2;

  // Detect sentiment and urgency
  const isUrgent = msg.match(/\b(urgent|asap|immediately|critical|emergency|broken|down|not working)\b/);
  const isFrustrated = msg.match(/\b(frustrated|annoying|still not|again|why|terrible)\b/);
  const isConfused = msg.match(/\b(confused|don't understand|unclear|what do you mean|huh)\b/);
  const isPositive = msg.match(/\b(thanks|thank you|great|awesome|perfect|exactly|yes|got it)\b/);

  // Enhanced intent detection with context
  const detectDetailedIntent = (): string => {
    // Greetings
    if (msg.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo)\b/)) {
      return 'greeting';
    }

    // Appreciation/Positive
    if (isPositive) {
      return 'positive_feedback';
    }

    // Confusion
    if (isConfused) {
      return 'needs_clarification';
    }

    // Dashboard & Overview
    if (msg.match(/\b(dashboard|overview|main page|home screen|interface|ui|layout)\b/)) {
      updateContext.topic = 'dashboard';
      return 'dashboard';
    }

    // AI Assistants - specific queries
    if (msg.match(/\b(ai assistant|voice assistant|assistant|bot|ai voice)\b/)) {
      updateContext.topic = 'ai_assistants';
      if (msg.includes('add') || msg.includes('create') || msg.includes('new')) return 'add_assistant';
      if (msg.includes('customize') || msg.includes('configure') || msg.includes('setup')) return 'customize_assistant';
      if (msg.includes('voice') || msg.includes('language')) return 'assistant_voice';
      if (msg.includes('train') || msg.includes('improve')) return 'train_assistant';
      return 'ai_assistants_general';
    }

    // Analytics - detailed
    if (msg.match(/\b(analytics|metrics|statistics|performance|reports|data|insights|graph|chart)\b/)) {
      updateContext.topic = 'analytics';
      if (msg.includes('export') || msg.includes('download')) return 'export_analytics';
      if (msg.includes('understand') || msg.includes('mean') || msg.includes('explain')) return 'explain_metrics';
      return 'analytics_general';
    }

    // Bookings - specific scenarios
    if (msg.match(/\b(booking|appointment|schedule|reservation|call)\b/)) {
      updateContext.topic = 'bookings';
      if (msg.includes('status') || msg.includes('update')) return 'booking_status';
      if (msg.includes('cancel') || msg.includes('delete')) return 'cancel_booking';
      if (msg.includes('filter') || msg.includes('search') || msg.includes('find')) return 'search_bookings';
      if (msg.includes('view') || msg.includes('see') || msg.includes('check')) return 'view_bookings';
      return 'bookings_general';
    }

    // Google Sheets - common issues
    if (msg.match(/\b(google sheets|sheets|spreadsheet|sync|integration|connect)\b/)) {
      updateContext.topic = 'google_sheets';
      if (msg.includes('not sync') || msg.includes('not working') || msg.includes('broken')) return 'sheets_sync_issue';
      if (msg.includes('connect') || msg.includes('setup') || msg.includes('integrate')) return 'sheets_connect';
      if (msg.includes('column') || msg.includes('mapping') || msg.includes('format')) return 'sheets_mapping';
      return 'google_sheets_general';
    }

    // Timezone issues
    if (msg.match(/\b(timezone|time zone|wrong time|incorrect time|time|clock)\b/)) {
      updateContext.topic = 'timezone';
      if (msg.includes('wrong') || msg.includes('incorrect') || msg.includes('not right')) return 'timezone_wrong';
      if (msg.includes('change') || msg.includes('set') || msg.includes('update')) return 'timezone_change';
      return 'timezone_general';
    }

    // Settings & Customization
    if (msg.match(/\b(setting|settings|configure|customize|preference|option)\b/)) {
      updateContext.topic = 'settings';
      if (msg.includes('notification')) return 'notification_settings';
      if (msg.includes('language')) return 'language_settings';
      if (msg.includes('security') || msg.includes('password') || msg.includes('2fa')) return 'security_settings';
      return 'settings_general';
    }

    // Problems & Troubleshooting
    if (msg.match(/\b(not working|broken|error|issue|problem|fix|help|trouble|can't|won't|doesn't)\b/)) {
      if (msg.includes('login') || msg.includes('sign in') || msg.includes('access')) return 'login_problem';
      if (msg.includes('slow') || msg.includes('lag') || msg.includes('performance')) return 'performance_problem';
      if (msg.includes('load') || msg.includes('loading')) return 'loading_problem';
      if (msg.includes('export')) return 'export_problem';
      return 'general_problem';
    }

    // How-to questions
    if (msg.match(/\b(how|how do|how to|how can|show me|teach me|guide|tutorial)\b/)) {
      if (msg.includes('start') || msg.includes('begin')) return 'getting_started';
      if (msg.includes('export')) return 'how_export';
      if (msg.includes('add') || msg.includes('create')) return 'how_add';
      return 'how_to_general';
    }

    // Yes/No responses
    if (msg.match(/^(yes|yeah|yep|yup|sure|ok|okay|correct|right|exactly)$/)) return 'affirmative';
    if (msg.match(/^(no|nope|nah|not really|incorrect)$/)) return 'negative';

    return 'general_inquiry';
  };

  const intent = detectDetailedIntent();

  // Generate contextual, conversational responses
  switch (intent) {
    case 'greeting':
      const greetings = [
        "Hey there! 👋 I'm your SENTRIA AI assistant. What brings you here today?",
        "Hello! Welcome to SENTRIA support! 🚀 How can I make your day easier?",
        "Hi! Great to see you! I'm here to help with anything SENTRIA-related. What's on your mind?",
      ];
      response = greetings[Math.floor(Math.random() * greetings.length)];
      quickReplies = [
        "I'm new here, where do I start?",
        "I have a problem",
        "Tell me about features",
        "Setup help"
      ];
      break;

    case 'positive_feedback':
      const positiveResponses = [
        "That's wonderful! 😊 Glad I could help! Is there anything else you'd like to know?",
        "You're very welcome! Happy to assist! 🎉 Feel free to ask if you need anything else.",
        "Awesome! I'm here anytime you need help. Anything else I can do for you?",
      ];
      response = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
      quickReplies = [
        "Show me advanced features",
        "Tips & tricks",
        "I'm all set, thanks!"
      ];
      updateContext.problemSolved = true;
      break;

    case 'needs_clarification':
      response = "No worries, let me explain that better! 🤔\n\nWhat specifically would you like me to clarify? I can break it down step-by-step or show you a different way.";
      quickReplies = [
        "Explain it differently",
        "Show me step-by-step",
        "Give me an example"
      ];
      updateContext.userNeedsClarification = true;
      break;

    case 'dashboard':
      response = "Great question about the dashboard! 📊\n\nThe SENTRIA Dashboard is your central hub. It shows:\n\n• **Real-time Analytics** - Live call metrics and performance\n• **Voice Usage Charts** - Track AI assistant activity\n• **Booking Overview** - See all appointments at a glance\n• **Activity Feed** - Recent events and notifications\n• **Performance Metrics** - Response time, accuracy, satisfaction\n\nWhat aspect of the dashboard interests you most?";
      quickReplies = [
        "Tell me about analytics",
        "How to view bookings?",
        "Explain the metrics",
        "Customize dashboard"
      ];
      break;

    case 'ai_assistants_general':
      response = "AI Voice Assistants are the heart of SENTRIA! 🤖✨\n\nThey can:\n• Answer customer calls 24/7\n• Schedule and manage bookings\n• Provide information and support\n• Handle multiple languages\n• Learn from interactions\n\nWhat would you like to do with your AI assistants?";
      quickReplies = [
        "Create a new assistant",
        "Customize voice/personality",
        "Training & improvement",
        "Language options"
      ];
      break;

    case 'add_assistant':
      response = "Let's create a new AI assistant! Here's how:\n\n**Step 1:** Click 'AI Assistants' in the navigation\n**Step 2:** Hit the '+ Add New Assistant' button\n**Step 3:** Choose a voice type (Professional, Friendly, or Casual)\n**Step 4:** Select language(s)\n**Step 5:** Define the use case (Sales, Support, Bookings, etc.)\n**Step 6:** Customize personality traits\n**Step 7:** Test it out and activate!\n\nWant me to walk you through any specific step?";
      quickReplies = [
        "Voice type options?",
        "What languages available?",
        "Personality traits explained",
        "How to test it?"
      ];
      break;

    case 'customize_assistant':
      response = "Customizing your AI assistant is super flexible! 🎨\n\nYou can adjust:\n\n• **Voice & Tone** - Professional, friendly, casual, or custom\n• **Language** - English, French, Spanish, and more\n• **Response Speed** - Fast, balanced, or thoughtful\n• **Personality Traits** - Helpful, empathetic, efficient, humorous\n• **Knowledge Base** - Specific product/service info\n• **Greeting Messages** - Custom welcome scripts\n• **Fallback Behavior** - What happens when unsure\n\nWhich aspect do you want to customize first?";
      quickReplies = [
        "Change voice/tone",
        "Add languages",
        "Personality settings",
        "Custom scripts"
      ];
      break;

    case 'assistant_voice':
      response = "Voice and language options in SENTRIA are awesome! 🎙️\n\n**Voice Types:**\n• Professional - Clear, confident, business-appropriate\n• Friendly - Warm, approachable, conversational\n• Casual - Relaxed, informal, personable\n• Custom - Upload your own voice samples!\n\n**Languages Supported:**\n• English (US, UK, AU)\n• French (FR, CA)\n• Spanish (ES, LATAM)\n• German, Italian, Portuguese\n• And 15+ more!\n\nYou can even have multilingual assistants that auto-detect the caller's language! Want to set this up?";
      quickReplies = [
        "Set up multilingual",
        "Change current voice",
        "Custom voice upload",
        "Test different voices"
      ];
      break;

    case 'train_assistant':
      response = "Training your AI assistant makes it smarter over time! 🧠\n\nHere's how it learns:\n\n1. **Review Conversations** - Check call transcripts regularly\n2. **Mark Corrections** - Flag misunderstood queries\n3. **Add to Knowledge Base** - Include new FAQs and info\n4. **Adjust Responses** - Refine how it answers specific questions\n5. **Monitor Accuracy** - Track the accuracy metric in analytics\n6. **Customer Feedback** - Use satisfaction scores to identify improvements\n\nThe AI automatically improves from each interaction, but manual training accelerates it!\n\nWant to start reviewing conversations or add knowledge?";
      quickReplies = [
        "Review recent calls",
        "Add to knowledge base",
        "Check accuracy metrics",
        "Set up feedback loop"
      ];
      break;

    case 'analytics_general':
      response = "SENTRIA Analytics gives you powerful insights! 📈\n\nHere's what you can track:\n\n• **Response Time** - How fast your AI responds (avg 0.8s)\n• **Accuracy Rate** - Query understanding success (aim for 95%+)\n• **Satisfaction Score** - Customer feedback ratings\n• **Call Volume** - Hourly, daily, weekly trends\n• **Peak Hours** - When you get most calls\n• **Call Duration** - Average conversation length\n• **Conversion Rate** - Calls that lead to bookings\n• **Assistant Performance** - Individual AI metrics\n\nAll metrics update in real-time! Which metric matters most to you?";
      quickReplies = [
        "Explain accuracy rate",
        "View peak hours analysis",
        "Export analytics data",
        "Set up alerts"
      ];
      break;

    case 'explain_metrics':
      response = "Let me break down the key metrics for you! 📊\n\n**Response Time:** How quickly your AI picks up and starts responding to calls. Lower is better! Aim for under 1 second.\n\n**Accuracy:** Percentage of queries your AI correctly understands. 95%+ is excellent!\n\n**Satisfaction Score:** Based on customer feedback after calls. Calculated from 1-5 star ratings.\n\n**Call Duration:** Average length of conversations. Can indicate efficiency or complexity.\n\n**Conversion Rate:** % of calls that result in a booking or desired action.\n\nWhich metric would you like to improve?";
      quickReplies = [
        "Improve response time",
        "Boost accuracy rate",
        "Increase satisfaction",
        "Optimize call duration"
      ];
      break;

    case 'export_analytics':
      response = "Exporting your data is super easy! 📥\n\nHere's how:\n\n1. Go to the **Analytics** page\n2. Click **'Export Data'** (top right corner)\n3. Select your **date range** (up to 90 days)\n4. Choose **format**:\n   • CSV - For Excel/spreadsheets\n   • Excel - Native Excel file\n   • PDF - Visual report with charts\n5. Pick which **metrics** to include\n6. Click **'Generate Export'**\n\nYour file downloads instantly! You can also schedule automated weekly/monthly reports.\n\nWant to export now or set up automated reports?";
      quickReplies = [
        "Export last 30 days",
        "Set up auto reports",
        "What format is best?",
        "Schedule weekly export"
      ];
      break;

    case 'bookings_general':
      response = "Booking management in SENTRIA is comprehensive! 📅\n\nYou can:\n\n• **View All Bookings** - See complete appointment list\n• **Filter & Search** - By status, date, service type, client\n• **Update Status** - Confirmed, Pending, Cancelled, Completed, No-show\n• **Track Details** - Call duration, service type, time slots\n• **Export Reports** - Download booking data\n• **After-hours Flag** - See bookings outside business hours\n• **Sync with Google Sheets** - Auto-update your spreadsheets\n\nWhat do you need to do with bookings?";
      quickReplies = [
        "View today's bookings",
        "Change booking status",
        "Search for a booking",
        "Export booking report"
      ];
      break;

    case 'booking_status':
      response = "Managing booking statuses is simple! Let me explain each one:\n\n📗 **Confirmed** - Booking is set and client confirmed\n⏳ **Pending** - Awaiting confirmation\n❌ **Cancelled** - Booking was cancelled\n✅ **Completed** - Service has been delivered\n⚠️ **No-show** - Client didn't attend\n\nTo update a status:\n1. Click on any booking\n2. Select the new status from the dropdown\n3. Save changes\n\nYou can also bulk-update multiple bookings! Need help with a specific booking?";
      quickReplies = [
        "Bulk update statuses",
        "Set status rules",
        "Auto-update from calls",
        "Status notification settings"
      ];
      break;

    case 'view_bookings':
      response = "Let's get you viewing your bookings! 👀\n\n**From Dashboard:**\nYour main dashboard shows today's bookings automatically!\n\n**From Bookings Page:**\n1. Click 'Bookings' in navigation\n2. Use filters: Date range, Status, Service type\n3. Search by client name, phone, or email\n4. Click any booking for full details\n\n**Quick Views:**\n• Today's Schedule\n• Upcoming This Week\n• Pending Confirmations\n• Recent Completions\n\nWhat bookings do you want to see?";
      quickReplies = [
        "Show today's bookings",
        "This week's schedule",
        "Pending confirmations",
        "Filter by service type"
      ];
      break;

    case 'search_bookings':
      response = "Searching bookings is powerful! 🔍\n\nYou can search by:\n\n• **Client Name** - First or last name\n• **Phone Number** - Full or partial\n• **Email Address**\n• **Booking ID** - Unique reference number\n• **Service Type** - Filter by specific services\n• **Date Range** - Custom date selection\n• **Status** - Any status type\n• **Time Slot** - Morning, afternoon, evening\n\nJust start typing in the search box and results filter instantly! You can combine multiple filters too.\n\nWhat are you looking for?";
      quickReplies = [
        "Search by client name",
        "Find by phone number",
        "Filter by date range",
        "Show me advanced filters"
      ];
      break;

    case 'google_sheets_general':
      response = "Google Sheets integration is a game-changer! 📊✨\n\nBenefits:\n• **Auto-sync** every 15 minutes\n• **Two-way updates** - Changes flow both ways\n• **Column mapping** - Flexible data structure\n• **Real-time visibility** - Team can see latest data\n• **Backup & archive** - Your data in Sheets\n\nRequired columns:\n✓ Email\n✓ Phone Number\n✓ Name\n✓ Booking Status\n✓ Call Date/Time\n✓ Service Type\n✓ Call Duration\n\nDo you need help connecting, troubleshooting, or understanding how it works?";
      quickReplies = [
        "Connect Google Sheets",
        "Sync not working?",
        "Column mapping help",
        "Change connected sheet"
      ];
      break;

    case 'sheets_connect':
      response = "Let's connect your Google Sheets! Here's the step-by-step:\n\n**Step 1:** Go to Settings → Integrations\n\n**Step 2:** Click 'Connect Google Sheets'\n\n**Step 3:** Authorize SENTRIA (you'll see a Google login popup)\n\n**Step 4:** Select your spreadsheet from the list\n\n**Step 5:** Map your columns:\n- Column A → Email\n- Column B → Phone\n- Column C → Name\n- (and so on...)\n\n**Step 6:** Click 'Save & Test Connection'\n\n**Step 7:** Verify with a test sync!\n\nSync happens automatically every 15 minutes, or you can manual sync anytime.\n\nReady to start? Any questions about the steps?";
      quickReplies = [
        "What permissions needed?",
        "Can I use multiple sheets?",
        "How to test connection?",
        "Troubleshooting tips"
      ];
      break;

    case 'sheets_sync_issue':
      if (isFrustrated) {
        response = "I totally understand your frustration! 😔 Let's fix this sync issue right now.\n\nMost common causes:\n\n**1. Authorization Expired**\nSolution: Go to Settings → Integrations → Reauthorize Google\n\n**2. Permissions Changed**\nSolution: Check sheet is shared with 'Editor' access\n\n**3. Column Format Issues**\nSolution: Verify date/time format matches (MM/DD/YYYY HH:MM)\n\n**4. Sheet Renamed/Deleted**\nSolution: Reconnect to the correct sheet\n\n**5. Data Validation Errors**\nSolution: Check for empty required fields\n\nLet's start with #1 - when did you last authorize the connection?";
      } else {
        response = "Sync issues can be annoying, but we'll fix it! 🔧\n\nQuick troubleshooting:\n\n✓ **Check Authorization:** Settings → Integrations → Reauthorize\n✓ **Verify Permissions:** Sheet must have 'Editor' access\n✓ **Column Mapping:** Ensure columns are correctly mapped\n✓ **Data Format:** Dates should be MM/DD/YYYY format\n✓ **Manual Sync:** Try forcing a sync to test\n\nWhen did the sync last work successfully?";
      }
      quickReplies = [
        "Reauthorize now",
        "Check column mapping",
        "Force manual sync",
        "Last worked yesterday"
      ];
      break;

    case 'sheets_mapping':
      response = "Column mapping ensures your data flows correctly! 🗂️\n\n**How It Works:**\nYou tell SENTRIA which column in your sheet corresponds to each data field.\n\n**Required Mappings:**\n• Email → Usually Column A or B\n• Phone Number → Include country code format\n• Name → Can be 'Full Name' or 'First + Last'\n• Booking Status → Must match status names exactly\n• Call Date/Time → MM/DD/YYYY HH:MM format\n• Service Type → Text field\n• Call Duration → In minutes (number format)\n\n**Pro Tips:**\n- Header row should be Row 1\n- Data starts from Row 2\n- No merged cells in data range\n- Keep consistent formatting\n\nNeed help mapping a specific column?";
      quickReplies = [
        "Date format help",
        "Phone number format",
        "Status field rules",
        "Test my mapping"
      ];
      break;

    case 'timezone_general':
      response = "Timezone settings ensure accurate time displays! 🌍⏰\n\nSENTRIA shows time in:\n• **Header Clock** - Your selected timezone\n• **World Clock** - Multiple timezones\n• **Booking Times** - Converted to your zone\n• **Analytics Timestamps** - Localized\n• **Call History** - Adjusted for your timezone\n\nYour current timezone is detected automatically, but you can change it anytime in Settings.\n\nWhat do you need help with?";
      quickReplies = [
        "Change my timezone",
        "Add to world clock",
        "12hr vs 24hr format",
        "Why time is wrong?"
      ];
      break;

    case 'timezone_wrong':
      response = "Let's fix that time display! ⏰\n\nQuick fix:\n\n1. Click **Settings** (gear icon)\n2. Go to **General Settings**\n3. Find **'Timezone'** dropdown\n4. Select your correct timezone\n5. Changes apply **immediately**!\n\nIf it's still wrong after changing:\n• Try refreshing your browser (F5)\n• Clear browser cache\n• Check your computer's timezone is correct\n\nWhat timezone should it be showing?";
      quickReplies = [
        "Pacific Time (PST)",
        "Eastern Time (EST)",
        "Central European Time",
        "Still wrong after changing"
      ];
      break;

    case 'timezone_change':
      response = "Changing timezone is instant! Here's how:\n\n**Method 1: Settings**\n1. Settings → General Settings\n2. 'Timezone' dropdown\n3. Select from 400+ timezones\n4. Done! ✓\n\n**Method 2: World Clock**\n1. Click time in header\n2. World Clock opens\n3. Select timezone\n4. Set as default (optional)\n\n**Pro Tip:** You can save multiple timezones in World Clock for quick reference if you work with international clients!\n\nWhich timezone do you need?";
      quickReplies = [
        "See all timezones",
        "Add to world clock",
        "Set business hours timezone",
        "Client timezone tracking"
      ];
      break;

    case 'settings_general':
      response = "SENTRIA Settings let you customize everything! ⚙️\n\n**Main Categories:**\n\n🔧 **General Settings**\n- Timezone, language, time format\n- Display preferences\n\n🔔 **Notifications**\n- Email alerts, push notifications\n- Alert thresholds\n\n🔒 **Security & Privacy**\n- Password, 2FA, sessions\n- Data privacy controls\n\n👥 **Team Management**\n- Users, roles, permissions\n- Access control\n\n🔗 **Integrations**\n- Google Sheets, APIs, webhooks\n- Third-party connections\n\nWhat would you like to configure?";
      quickReplies = [
        "General settings",
        "Notification setup",
        "Security options",
        "Team management"
      ];
      break;

    case 'notification_settings':
      response = "Notification settings keep you informed without overwhelming you! 🔔\n\n**Types of Notifications:**\n\n📧 **Email Alerts:**\n- New bookings\n- Cancelled appointments\n- System updates\n- Performance alerts\n\n📱 **Push Notifications:**\n- Real-time booking updates\n- Urgent issues\n- Call completions\n\n⚠️ **Custom Alerts:**\n- Accuracy drops below X%\n- Response time exceeds Y seconds\n- Call volume spikes\n- Sheet sync failures\n\n**How to Configure:**\nSettings → Notification Preferences → Toggle each type + set thresholds\n\nWhat notifications do you want to receive?";
      quickReplies = [
        "Email for bookings only",
        "Set performance alerts",
        "Turn off push notifications",
        "Custom alert thresholds"
      ];
      break;

    case 'language_settings':
      response = "SENTRIA supports multiple languages! 🌐\n\n**Available Interface Languages:**\n• English (US)\n• French (Français)\n• Spanish (Español)\n• German (Deutsch)\n• And more coming soon!\n\n**How to Switch:**\n1. Click language selector in taskbar (top right)\n2. Select your language\n3. Interface updates **instantly**!\n\n**What Changes:**\n• All UI text and labels\n• Help documentation\n• AI assistant responses\n• Notification messages\n• Reports and exports\n\n**Note:** Your AI voice assistants have separate language settings (they can speak 15+ languages!).\n\nWhich language would you like to use?";
      quickReplies = [
        "Switch to French",
        "Keep English",
        "AI assistant languages",
        "Add more languages"
      ];
      break;

    case 'security_settings':
      response = "Security is our top priority! 🔒\n\n**Security Features:**\n\n🔐 **Two-Factor Authentication (2FA)**\n- SMS or authenticator app\n- Required for admin accounts\n\n🔑 **Password Requirements**\n- 12+ characters\n- Mix of letters, numbers, symbols\n- Regular change reminders\n\n📊 **Data Protection**\n- AES-256 encryption at rest\n- TLS 1.3 for transmission\n- SOC 2 Type II certified\n- GDPR compliant\n\n🚪 **Session Management**\n- Auto-logout after inactivity\n- Device tracking\n- Remote session termination\n\n**Want to enable 2FA? It only takes 2 minutes!**";
      quickReplies = [
        "Enable 2FA now",
        "Change password",
        "View active sessions",
        "Privacy settings"
      ];
      break;

    case 'login_problem':
      if (isUrgent) {
        response = "I can see this is urgent! Let's get you logged in ASAP! 🚨\n\n**Quick Fixes:**\n\n1️⃣ **Password Reset**\nClick 'Forgot Password' → Check email → Set new password\n\n2️⃣ **Check Email**\nMake sure you're using the email associated with your account\n\n3️⃣ **Browser Issues**\nTry incognito mode or different browser\n\n4️⃣ **Clear Cache**\nCtrl+Shift+Delete → Clear cookies & cache\n\n5️⃣ **Account Locked?**\nToo many failed attempts? Wait 15 minutes or contact support\n\nWhich issue sounds most likely?";
      } else {
        response = "Login trouble? Let's solve it! 🔓\n\nCommon issues:\n\n• **Wrong Password** → Use 'Forgot Password'\n• **Wrong Email** → Try alternate emails\n• **Caps Lock On** → Check keyboard\n• **Browser Cookies** → Enable cookies\n• **Account Locked** → Wait 15 min after failed attempts\n\nWhat's happening when you try to log in?";
      }
      quickReplies = [
        "Forgot password",
        "Not receiving reset email",
        "Account locked message",
        "Wrong email address"
      ];
      break;

    case 'performance_problem':
      response = "Let's speed things up! 🚀\n\n**Quick Performance Fixes:**\n\n1️⃣ **Browser:**\n- Update to latest version\n- Chrome/Firefox/Safari recommended\n\n2️⃣ **Clear Cache:**\n- Ctrl+Shift+Delete\n- Clear last 7 days\n\n3️⃣ **Close Tabs:**\n- Too many tabs slow everything down\n\n4️⃣ **Check Internet:**\n- Need minimum 5 Mbps\n- Run speed test\n\n5️⃣ **Disable Extensions:**\n- Some block features or slow loading\n\n**System Requirements:**\n• Chrome 90+, Firefox 88+, Safari 14+\n• 8GB RAM recommended\n• Stable internet connection\n\nWhich step should we try first?";
      quickReplies = [
        "Clear cache now",
        "Check internet speed",
        "Update browser",
        "Still slow after fixes"
      ];
      break;

    case 'loading_problem':
      response = "Loading issues are frustrating! Let's fix it. ⏳\n\n**Troubleshooting Steps:**\n\n1. **Hard Refresh:** Ctrl+Shift+R (Cmd+Shift+R on Mac)\n\n2. **Check Status:** Is SENTRIA having issues? (I can check!)\n\n3. **Try Different Page:** Does dashboard load but not analytics?\n\n4. **Network Check:** Are other websites loading fine?\n\n5. **Browser Console:** Press F12 → See any red errors?\n\nWhich page is having trouble loading?";
      quickReplies = [
        "Dashboard won't load",
        "Analytics stuck loading",
        "Bookings page frozen",
        "Check system status"
      ];
      break;

    case 'export_problem':
      response = "Export issues? Let's get your data! 📥\n\n**Common Fixes:**\n\n✓ **Pop-ups Blocked?**\nAllow pop-ups for sentria.ai\n\n✓ **Date Range Too Large?**\nMax 90 days - try smaller range\n\n✓ **File Permissions?**\nCheck you have write access to downloads folder\n\n✓ **Format Issues?**\nTry different format (CSV vs Excel vs PDF)\n\n✓ **Browser Settings?**\nCheck downloads aren't being blocked\n\n**Alternative:** I can help you export a specific date range right now!\n\nWhat happens when you try to export?";
      quickReplies = [
        "No download starts",
        "File is empty",
        "Wrong data exported",
        "Try different format"
      ];
      break;

    case 'general_problem':
      response = "I'm here to help troubleshoot! 🔧\n\nTo help you better, I need to know:\n\n1. **What's not working?** (Be specific!)\n2. **When did it start?** (Today? After update?)\n3. **What happens exactly?** (Error message? Nothing happens?)\n4. **What were you trying to do?** (Click something? View page?)\n\nThe more details you give me, the faster I can solve it!\n\nWhat's the issue you're experiencing?";
      quickReplies = [
        "Page won't load",
        "Button doesn't work",
        "Data not showing",
        "Error message appeared"
      ];
      break;

    case 'getting_started':
      response = "Welcome to SENTRIA! Let's get you set up! 🎉\n\n**Your Quick Start Guide:**\n\n**Week 1: Foundation**\n📝 Day 1-2: Complete your profile & explore dashboard\n🤖 Day 3-4: Create your first AI voice assistant\n📊 Day 5-7: Connect Google Sheets & test bookings\n\n**Week 2: Optimization**\n⚙️ Customize assistant personality & voice\n📈 Set up analytics alerts\n👥 Invite team members (if applicable)\n🔔 Configure notifications\n\n**Week 3: Advanced**\n🎓 Train your AI with custom knowledge\n📊 Review performance metrics\n🚀 Optimize based on data\n\nWhere would you like to start?";
      quickReplies = [
        "Set up profile",
        "Create first assistant",
        "Connect Google Sheets",
        "Full tutorial"
      ];
      break;

    case 'how_export':
      response = "Exporting data is easy! Here's how:\n\n**From Analytics Page:**\n1. Navigate to **Analytics**\n2. Click **'Export Data'** button (top right)\n3. Select **date range** (up to 90 days)\n4. Choose **format**: CSV, Excel, or PDF\n5. Pick **metrics** to include\n6. Click **'Download'**\n\n**From Bookings Page:**\n1. Go to **Bookings**\n2. Apply any filters you want\n3. Click **'Export'**\n4. Choose format\n5. Download!\n\n**Pro Tip:** Set up automated weekly/monthly exports so reports come to your email automatically!\n\nWhat data do you want to export?";
      quickReplies = [
        "Export bookings",
        "Export analytics",
        "Setup auto reports",
        "Custom export"
      ];
      break;

    case 'how_add':
      response = "Adding new items is straightforward! What would you like to add?\n\n📋 **Booking** - Manually add an appointment\n🤖 **AI Assistant** - Create new voice assistant\n👤 **Team Member** - Invite user to your account\n🔔 **Alert Rule** - Custom notification trigger\n📊 **Report** - Scheduled analytics report\n\nJust click the **'+ Add'** or **'Create'** button in the relevant section!\n\nWhich one do you need?";
      quickReplies = [
        "Add booking manually",
        "Create AI assistant",
        "Invite team member",
        "Something else"
      ];
      break;

    case 'how_to_general':
      response = "I can teach you anything in SENTRIA! 📚\n\nPopular how-to topics:\n\n• Setting up AI assistants\n• Managing bookings\n• Connecting Google Sheets\n• Understanding analytics\n• Exporting data\n• Customizing settings\n• Team management\n• Troubleshooting issues\n\nWhat do you want to learn?";
      quickReplies = [
        "Setup guides",
        "Feature tutorials",
        "Best practices",
        "Advanced tips"
      ];
      break;

    case 'affirmative':
      if (context.userNeedsClarification) {
        response = "Great! Let me explain it step-by-step...\n\nWhat specifically should I break down for you?";
        quickReplies = [
          "The whole process",
          "Just the tricky part",
          "Give me an example"
        ];
      } else if (context.topic) {
        response = `Perfect! Let's continue with ${context.topic}. What else would you like to know about it?`;
        quickReplies = [
          "Tell me more",
          "Show me how",
          "Advanced features",
          "Troubleshooting"
        ];
      } else {
        response = "Awesome! What else can I help you with today?";
        quickReplies = [
          "Another question",
          "Different topic",
          "I'm all set!",
          "Show me tips & tricks"
        ];
      }
      break;

    case 'negative':
      response = "No problem! What would you like to explore instead?";
      quickReplies = [
        "Dashboard features",
        "AI assistants",
        "Bookings",
        "Settings"
      ];
      break;

    default:
      // Intelligent general response based on context
      if (hasAskedMultipleQuestions && !context.problemSolved) {
        response = "I notice you're exploring quite a bit! That's great! 😊\n\nLet me check - is there a specific goal you're trying to accomplish? Sometimes it helps to zoom out and tackle the main objective!\n\nWhat's the end result you're looking for?";
        quickReplies = [
          "Setup my dashboard",
          "Fix a problem",
          "Learn a feature",
          "Just browsing"
        ];
      } else if (isFrustrated) {
        response = "I can tell you're frustrated, and I really want to help! 😔\n\nLet's take a step back. Could you describe:\n\n1. What you're trying to do\n2. What's happening instead\n3. Any error messages you're seeing\n\nI promise we'll get this sorted out!";
        quickReplies = [
          "Start from beginning",
          "Show me the error",
          "Connect me to human support"
        ];
      } else if (msg.length > 100) {
        response = "I see you've given me a lot of details - that's helpful! 👍\n\nLet me focus on the main issue: It sounds like you're asking about [detecting key topic from message]. Is that right?\n\nCan you confirm so I can give you the most accurate help?";
        quickReplies = [
          "Yes, that's right",
          "Not quite",
          "Let me rephrase"
        ];
      } else {
        response = "I want to help, but I need a bit more information! 🤔\n\nCould you tell me:\n• What you're trying to do\n• Which part of SENTRIA you're working with\n• Any specific issues you're facing\n\nOr choose a topic below to explore!";
        quickReplies = [
          "Dashboard & Analytics",
          "AI Assistants",
          "Bookings Management",
          "Google Sheets Integration"
        ];
      }
  }

  return { message: response, quickReplies, updateContext };
};

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'faq' | 'contact' | 'tickets' | 'chat'>('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      sender: 'agent', 
      message: "Hey there! 👋 I'm your SENTRIA AI assistant. I can help you with anything - from setting up features to troubleshooting issues. What brings you here today?", 
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        "I'm new, where do I start?",
        "I have a problem to solve",
        "Tell me about features",
        "Need setup help"
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    topic: null,
    lastIntent: null,
    userNeedsClarification: false,
    askedAbout: [],
    problemSolved: false
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Form states
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  });

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Sample FAQs
  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I get started with SENTRIA?',
      answer: 'Getting started with SENTRIA is easy! First, log into your dashboard and navigate to the Settings page. From there, you can configure your AI voice assistants, set up your preferences, and integrate with Google Sheets for booking management.',
      category: 'Getting Started',
      helpful: 245
    },
    {
      id: 2,
      question: 'How do I integrate my Google Sheets data?',
      answer: 'To integrate Google Sheets: 1) Go to Settings > Integrations, 2) Click on "Connect Google Sheets", 3) Authorize SENTRIA to access your sheets, 4) Select the sheet containing your booking data, 5) Map the columns (email, phone, name, booking status, etc.), and 6) Click "Save Integration". Your data will sync automatically every 15 minutes.',
      category: 'Integrations',
      helpful: 189
    },
    {
      id: 3,
      question: 'What are the different booking statuses?',
      answer: 'SENTRIA tracks several booking statuses: "Confirmed" (booking is confirmed and scheduled), "Pending" (awaiting confirmation), "Cancelled" (booking was cancelled), "Completed" (service has been delivered), and "No-show" (client did not attend). You can customize these statuses in Settings > Booking Configuration.',
      category: 'Bookings',
      helpful: 156
    },
    {
      id: 4,
      question: 'How do I change my timezone settings?',
      answer: 'Navigate to Settings > General Settings and find the "Timezone" dropdown. Select your preferred timezone from the list. This will update all time displays throughout the dashboard, including the header clock, World Clock modal, and booking times. The change takes effect immediately.',
      category: 'Settings',
      helpful: 203
    },
    {
      id: 5,
      question: 'Can I switch between 12-hour and 24-hour time format?',
      answer: 'Yes! Go to Settings > General Settings and toggle the "Time Format" option between 12-hour and 24-hour formats. This preference will be applied to all time displays in the dashboard.',
      category: 'Settings',
      helpful: 178
    },

    {
      id: 7,
      question: 'What do the performance metrics mean?',
      answer: 'Performance metrics include: "Response Time" (average time to respond to calls), "Accuracy" (percentage of correctly understood queries), "Satisfaction Score" (based on customer feedback), and "Call Duration" (average length of interactions). These metrics are updated in real-time and help you optimize your AI assistants.',
      category: 'Analytics',
      helpful: 142
    },

    {
      id: 9,
      question: 'Can I export my analytics data?',
      answer: 'Yes! Go to the Analytics page and click the "Export Data" button in the top right corner. You can export data in CSV, Excel, or PDF formats. Choose your date range and select which metrics to include. Exports are generated instantly for up to 90 days of data.',
      category: 'Analytics',
      helpful: 134
    },

  ];

  // Sample support tickets
  const supportTickets: SupportTicket[] = [
    { id: 'TKT-2847', subject: 'Cannot connect Google Sheets', status: 'in-progress', date: '2026-02-10', priority: 'high' },
    { id: 'TKT-2832', subject: 'Timezone not updating correctly', status: 'resolved', date: '2026-02-08', priority: 'medium' },
    { id: 'TKT-2819', subject: 'Export feature not working', status: 'open', date: '2026-02-07', priority: 'low' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Support ticket submitted successfully!\n\nSubject: ${contactForm.subject}\nCategory: ${contactForm.category}\nPriority: ${contactForm.priority}\n\nOur team will respond within 24 hours.`);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      priority: 'medium',
      message: ''
    });
    setShowContactForm(false);
  };

  const handleChatSend = (message?: string) => {
    const messageToSend = message || chatInput.trim();
    if (messageToSend === '') return;
    
    setChatInput('');
    
    // Generate AI response INSTANTLY
    const aiResponse = generateDynamicResponse(messageToSend, chatMessages, conversationContext);
    
    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      ...aiResponse.updateContext,
      askedAbout: [...prev.askedAbout, messageToSend.substring(0, 50)]
    }));
    
    // Add both messages at once to avoid state batching issues
    setChatMessages(prev => {
      const userMessage: ChatMessage = {
        id: prev.length + 1,
        sender: 'user',
        message: messageToSend,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      const agentMessage: ChatMessage = {
        id: prev.length + 2,
        sender: 'agent',
        message: aiResponse.message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        quickReplies: aiResponse.quickReplies
      };
      
      return [...prev, userMessage, agentMessage];
    });
  };

  const handleQuickReply = (reply: string) => {
    handleChatSend(reply);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'getting started': return <Zap className="w-4 h-4" />;
      case 'integrations': return <Database className="w-4 h-4" />;
      case 'bookings': return <Book className="w-4 h-4" />;
      case 'settings': return <Settings className="w-4 h-4" />;
      case 'ai assistants': return <MessageCircle className="w-4 h-4" />;
      case 'analytics': return <TrendingUp className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'team management': return <Users className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
          Help & Support Center
        </h2>
        <p className="text-gray-400">Get assistance and learn how to use SENTRIA effectively</p>
      </div>

      {/* Search Bar */}

      {/* Tab Navigation */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-2 border border-blue-500/20 shadow-xl">
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'overview', label: 'Overview', icon: HelpCircle },
            { id: 'faq', label: 'FAQs', icon: MessageSquare },
            { id: 'contact', label: 'Contact Support', icon: Mail },
            { id: 'tickets', label: 'My Tickets', icon: FileText },
            { id: 'chat', label: 'AI Chat', icon: Bot }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => setActiveTab('chat')}
              className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl hover:border-blue-400/40 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Chat Support</h3>
              <p className="text-gray-400 text-sm mb-4">Interactive AI assistant with instant, intelligent answers</p>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-blue-400 text-xs font-semibold">Fully Interactive AI</span>
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('contact')}
              className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl hover:border-purple-400/40 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
              <p className="text-gray-400 text-sm mb-4">Submit a ticket and get help within 24h</p>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                <span>Create Ticket</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => window.location.href = 'tel:+15557368742'}
              className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl hover:border-green-400/40 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phone Support</h3>
              <p className="text-gray-400 text-sm mb-4">Call us (Mon-Fri, 9AM-6PM PST)</p>
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                <span>+1 (555) 736-8742</span>
              </div>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              Frequently Asked Questions
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div 
                onClick={() => setActiveTab('faq')}
                className="p-5 bg-black/20 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-500/20 text-orange-400 border-orange-400/20">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold">FAQs</h4>
                      <span className="text-xs text-gray-400">{faqs.length} items</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Frequently asked questions and answers</p>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Most Helpful Articles
            </h3>
            
            <div className="space-y-3">
              {faqs.slice(0, 5).sort((a, b) => b.helpful - a.helpful).map((faq) => (
                <div 
                  key={faq.id} 
                  onClick={() => { setExpandedFaq(faq.id); setActiveTab('faq'); }}
                  className="p-4 bg-black/20 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(faq.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium mb-1">{faq.question}</h4>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-400">{faq.category}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Frequently Asked Questions
            </h3>

            {searchQuery && (
              <div className="mb-4 text-sm text-gray-400">
                Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>
            )}

            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div 
                  key={faq.id}
                  className="bg-black/20 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-5 flex items-start justify-between gap-4 text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          {getCategoryIcon(faq.category)}
                        </div>
                        <span className="text-xs text-blue-400 font-semibold">{faq.category}</span>
                      </div>
                      <h4 className="text-white font-semibold text-lg">{faq.question}</h4>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div className="px-5 pb-5 pt-2 border-t border-blue-400/10">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-400 mb-2">No results found</h4>
                <p className="text-gray-500 mb-4">Try different keywords or ask our AI chat</p>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <Bot className="w-4 h-4" />
                  Ask AI Assistant
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Submit Support Request
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 transition-all"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="feature">Feature Request</option>
                    <option value="integration">Integration Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 transition-all resize-none"
                  placeholder="Please provide detailed information about your issue or question..."
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-blue-400/10">
                <p className="text-sm text-gray-400">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  We typically respond within 24 hours
                </p>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-gray-400 text-sm mb-2">support@sentria.ai</p>
              <p className="text-gray-500 text-xs">Response within 24h</p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Phone</h4>
              <p className="text-gray-400 text-sm mb-2">+1 (555) 736-8742</p>
              <p className="text-gray-500 text-xs">Mon-Fri, 9AM-6PM PST</p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">AI Chat</h4>
              <p className="text-gray-400 text-sm mb-2">Available 24/7</p>
              <p className="text-gray-500 text-xs">Instant AI support</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              My Support Tickets
            </h3>

            <div className="space-y-3">
              {supportTickets.map((ticket) => {
                const statusColors = {
                  'open': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
                  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
                  'resolved': 'bg-green-500/20 text-green-400 border-green-400/30'
                };
                
                const priorityColors = {
                  'low': 'text-gray-400',
                  'medium': 'text-yellow-400',
                  'high': 'text-red-400'
                };

                const statusIcons = {
                  'open': Clock,
                  'in-progress': AlertCircle,
                  'resolved': Check
                };

                const StatusIcon = statusIcons[ticket.status];

                return (
                  <div 
                    key={ticket.id}
                    className="p-5 bg-black/20 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono text-gray-400">{ticket.id}</span>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border ${statusColors[ticket.status]}`}>
                            <StatusIcon className="w-3 h-3" />
                            {ticket.status.replace('-', ' ').toUpperCase()}
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-semibold ${priorityColors[ticket.priority]}`}>
                            <AlertCircle className="w-3 h-3" />
                            {ticket.priority.toUpperCase()}
                          </div>
                        </div>
                        <h4 className="text-white font-semibold mb-2">{ticket.subject}</h4>
                        <p className="text-sm text-gray-400">Submitted on {new Date(ticket.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>

            {supportTickets.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-400 mb-2">No support tickets</h4>
                <p className="text-gray-500 mb-6">You haven't submitted any support requests yet</p>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                >
                  Create New Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl border border-blue-500/20 shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="p-6 border-b border-blue-400/20 bg-black/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      SENTRIA AI Assistant
                      <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Instant Responses • Always Learning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id}>
                  <div 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%]`}>
                      {msg.sender === 'agent' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-gray-400 font-medium">SENTRIA AI</span>
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm' 
                          : 'bg-black/40 text-gray-200 border border-blue-400/20 rounded-bl-sm'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.message}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">{msg.timestamp}</p>
                      
                      {/* Quick Replies */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && msg.id === chatMessages[chatMessages.length - 1].id && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.quickReplies.map((reply, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-2 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30 transition-all hover:scale-105"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator - Removed since responses are instant */}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-blue-400/20 bg-black/20">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask me anything about SENTRIA... I'm here to help!"
                  className="flex-1 px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/60 transition-all"
                />
                <button 
                  onClick={() => handleChatSend()}
                  disabled={!chatInput.trim()}
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Instant AI responses • Contextual understanding • Conversational intelligence
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
