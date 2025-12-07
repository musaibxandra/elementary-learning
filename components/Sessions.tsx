'use client';
import React from 'react';
import { Scissors, Sparkles, Heart, Flower2, Clock, Star, Brain, BrainCircuit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  price: number;
  duration: string;
  popular: boolean;
};

const ServiceCard = ({ title, description, price, duration, popular }: ServiceCardProps) => (
  <Card className="relative hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    {popular && (
      <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black text-white text-xs px-2 py-0.5">
        <Star className="w-3 h-3 mr-1" />
        Popular
      </Badge>
    )}
    <CardHeader className="pb-3 sm:pb-4">
      <CardTitle className="text-base sm:text-lg mt-3 sm:mt-5 pr-8 sm:pr-12">{title}</CardTitle>
      <CardDescription className="text-xs sm:text-sm mt-2">{description}</CardDescription>
    </CardHeader>
    <CardContent className="mt-auto pt-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-4 border-t">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{duration}</span>
        </div>
        <div className="text-lg sm:text-xl font-bold">{price} BHD</div>
      </div>
    </CardContent>
  </Card>
);

export default function SalonCatalog() {
  const sessions = [
  {
    title: "30-Day Reset: Discipline & Emotional Mastery",
    description: "A powerful express program to rebuild self-control, break bad habits, and regain inner calm",
    price: 49,
    duration: "30 days (10–15 min/day)",
    popular: true
  },
  {
    title: "The Complete Transformation",
    description: "Deep-dive into prophetic character: patience, honesty, humility, and anger management (12-week flagship)",
    price: 179,
    duration: "12 weeks",
    popular: true
  },
  {
    title: "Healing the Heart: Letting Go of Grudges & Resentment",
    description: "Therapeutic + spiritual tools to forgive, release pain, and restore peace",
    price: 89,
    duration: "6 weeks",
    popular: true
  },
  {
    title: "Daily Character Journaling",
    description: "Simple, gentle practice to cultivate mindfulness, gratitude, and moral awareness every day",
    price: 29,
    duration: "Self-paced (30-day guided journal)",
    popular: false
  }
];

const classics = [
  {
    title: "Foundations of Ethics & Morals",
    description: "Classical journey through the Qur’an and Sunnah on building noble character",
    price: 99,
    duration: "8 weeks",
    popular: true
  },
  {
    title: "Purification of the Soul",
    description: "In-depth study of spiritual diseases and their cures with Imam al-Ghazali & Ibn al-Qayyim",
    price: 149,
    duration: "16 weeks",
    popular: true
  },
  {
    title: "The Prophetic Character Blueprint",
    description: "40 traits of the Prophet ﷺ – practical steps to embody each one in modern life",
    price: 129,
    duration: "10 weeks",
    popular: false
  },
  {
    title: "Living the Garden of the Righteous",
    description: "Weekly study circle format with reflection, discussion, and real-life application",
    price: 119,
    duration: "20 weeks",
    popular: true
  },
  {
    title: "Mastering Lower Self – Intensive Retreat-Style Course",
    description: "Advanced training in overcoming ego, envy, pride, and desire",
    price: 199,
    duration: "12 weeks + live sessions",
    popular: false
  },
  {
    title: "Morning & Evening Character Routine",
    description: "Short daily audios + workbook to start and end your day with taqwa and excellence",
    price: 39,
    duration: "Self-paced",
    popular: false
  }
];

const popular = [
  {
    title: "Anger to Sabr: Transform Your Reactions",
    description: "Evidence-based tools + sunnah practices to master anger in 40 days",
    price: 79,
    duration: "40 days",
    popular: true
  },
  {
    title: "The Honest Heart: Curing Lies & Building Integrity",
    description: "Step-by-step program to become a person of unshakable truthfulness",
    price: 89,
    duration: "8 weeks",
    popular: true
  },
  {
    title: "Envy-Free Living",
    description: "Heal hasad, celebrate others’ success, and unlock your own barakah",
    price: 69,
    duration: "6 weeks",
    popular: true
  },
  {
    title: "Gentle Speech: Taming the Tongue",
    description: "End gossip, sarcasm, and harshness – speak only what is good",
    price: 59,
    duration: "30 days",
    popular: false
  },
  {
    title: "Couples Character Journey",
    description: "Strengthen your marriage through mutual growth in patience, mercy, and respect",
    price: 149,
    duration: "10 weeks (for couples)",
    popular: false
  }
];

const spa = [
  {
    title: "Inner Peace Facial: Anxiety & Overthinking Cleanse",
    description: "Guided program combining CBT, dhikr, and journaling to clear mental clutter",
    price: 79,
    duration: "4 weeks",
    popular: true
  },
  {
    title: "Full Soul Spa Day Retreat (Online)",
    description: "A complete day of healing: forgiveness work, grief release, tawba, and renewal",
    price: 199,
    duration: "1 full day (6 hours live)",
    popular: true
  },
  {
    title: "Healing Religious Trauma & Spiritual Abuse",
    description: "Safe, compassionate course for rebuilding faith after harm",
    price: 139,
    duration: "10 weeks",
    popular: false
  },
  {
    title: "Mindful Parenting with Prophetic Mercy",
    description: "Raise children with emotional intelligence, adab, and strong iman",
    price: 99,
    duration: "8 weeks",
    popular: true
  },
  {
    title: "Reclaiming Your Faith After Doubt",
    description: "Honest conversations, intellectual answers, and heart-based healing",
    price: 109,
    duration: "9 weeks",
    popular: false
  },
  {
    title: "Daily & Reflection Therapy",
    description: "45-minute guided sessions blending remembrance of Allah with emotional release",
    price: 45,
    duration: "Single session (repeatable)",
    popular: false
  }
];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 my-6 sm:my-10 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto my-8 sm:my-12 w-full min-w-0">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Our Services</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Indulge in Learning and Mindfullness</p>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="sessions" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Regular</span>
            </TabsTrigger>
            <TabsTrigger value="classics" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
              <BrainCircuit className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Mental</span>
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Religious</span>
            </TabsTrigger>
            <TabsTrigger value="spa" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
              <Flower2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Ethics & Morals</span>
              <span className="xs:hidden">Ethics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4 sm:gap-6 lg:gap-8">
              {sessions.map((service, index) => {
                return (
                  <Link key={index} href={`/payment`} passHref>
                    <div className="cursor-pointer">
                      <ServiceCard {...service} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="classics">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4 sm:gap-6 lg:gap-8">
              {classics.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4 sm:gap-6 lg:gap-8">
              {popular.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spa">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4 sm:gap-6 lg:gap-8">
              {spa.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Ready to SignUp?</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">Contact us to schedule your appointment today</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Button size="lg" className="bg-black cursor-pointer text-white hover:bg-black/90 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}