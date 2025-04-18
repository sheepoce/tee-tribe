
# 🏌️‍♂️ TeeTribe - Golf Course Tracking Application

TeeTribe is a modern web application that helps golfers find courses, track rounds, and connect with other players.

![TeeTribe Preview](https://via.placeholder.com/800x400?text=TeeTribe+Preview)

## 🚀 Technologies

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom TeeTribe theme
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: TanStack React Query
- **Maps**: Mapbox GL
- **Backend**: Supabase (Authentication, Database, Storage)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 🏗️ Project Structure

```
/src
  /components         # Reusable UI components
    /ui               # Base UI components (shadcn/ui)
    /layout           # Layout components (Navbar, BottomNav, etc.)
    /theme            # Theme-related components
  /hooks              # Custom React hooks
  /integrations       # External service integrations
    /supabase         # Supabase client and types
  /lib                # Utility functions and helpers
  /pages              # Page components
  /public             # Static assets
```

## 📋 Features

- **Course Search**: Find golf courses with autocomplete search
- **Interactive Map**: View courses on an interactive map with filtering
- **Round Logging**: Track golf rounds and performance
- **User Profiles**: Manage golfer profiles and statistics
- **Friends System**: Connect with other golfers
- **Dark Mode**: Optimized dark UI for outdoor visibility

## 🔧 Setup & Development

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd teetribe
   ```

2. Install dependencies:
   ```bash
   npm install
   # or 
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) to view the app.

## 🗄️ Database Schema

### Courses Table
- `id`: text (primary key)
- `name`: text (required)
- `address`: text
- `region`: text
- `lat`: double precision
- `lng`: double precision
- `holes`: smallint
- `country`: text
- `created_at`: timestamp
- `source_id`: text

## 🔌 API Integration

The application integrates with a Golf Course API to import and update course data. This is handled through a Supabase Edge Function (`import-courses`).

## 🎨 UI Style Guide

TeeTribe uses a dark-themed UI optimized for outdoor visibility with the following color palette:

- **Primary Green**: `#4CAF50` - Accents, CTA buttons, badges
- **Secondary Mint**: `#9EE7B2` - Highlights, avatars, tag elements
- **Dark Surface**: `#0F0F0F` - App background
- **Card Surface**: `#1C1C1E` - Cards, modals, content containers
- **Soft Grey**: `#8E8E93` - Secondary text, dividers
- **White**: `#FFFFFF` - Primary text
- **Alert Red**: `#FF5C5C` - Errors, warnings, destructive actions
- **Badge Gold**: `#FFD700` - Milestone/achievement indicators

## 📦 Dependencies

### Core
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^6.26.2
- `@tanstack/react-query`: ^5.56.2

### UI & Styling
- `tailwind-merge`: ^2.5.2
- `tailwindcss-animate`: ^1.0.7
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `lucide-react`: ^0.462.0

### Maps & Visualization
- `mapbox-gl`: ^3.11.0
- `recharts`: ^2.12.7

### Data & Forms
- `@supabase/supabase-js`: ^2.49.4
- `react-hook-form`: ^7.53.0
- `@hookform/resolvers`: ^3.9.0
- `zod`: ^3.23.8

### Date & Time
- `date-fns`: ^3.6.0

### UI Components
- Various Radix UI components (@radix-ui/*)

## 🔐 Environment Variables

The application uses the following environment variables:

- Supabase URL and API keys (managed through the Supabase integration)
- Mapbox access token (for map functionality)

## 🧪 Testing

(Add information about testing when implemented)

## 🚀 Deployment

The application can be deployed via Lovable's built-in deployment system:

1. Open the project in Lovable
2. Click on "Share" -> "Publish"
3. Follow the prompts to deploy the application

For custom domain configuration, navigate to Project > Settings > Domains in Lovable.

## 📚 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

(Add license information as appropriate)
