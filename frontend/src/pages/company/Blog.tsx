import { useMemo, useState } from "react";
import { Calendar, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const posts = [
  {
    id: "future-learning",
    title: "Building practical learning paths for modern teams",
    category: "Learning",
    date: "2024-06-01",
    excerpt:
      "How TESBINN structures programs to help learners apply new skills in their day-to-day roles.",
  },
  {
    id: "digital-growth",
    title: "Digital growth playbooks for new businesses",
    category: "Business",
    date: "2024-05-22",
    excerpt:
      "A look at the frameworks we teach to help entrepreneurs build sustainable demand pipelines.",
  },
  {
    id: "certification",
    title: "Why certification matters for workforce readiness",
    category: "Certification",
    date: "2024-05-10",
    excerpt:
      "Certification builds trust and accountability. Here is how we design ours.",
  },
  {
    id: "platform",
    title: "Inside the TESBINN platform roadmap",
    category: "Platform",
    date: "2024-04-30",
    excerpt:
      "Upcoming tools for instructors, learners, and enterprise partners.",
  },
];

const Blog = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [email, setEmail] = useState("");

  const categories = ["all", "Learning", "Business", "Certification", "Platform"];

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "all" && post.category !== category) return false;
      if (!normalized) return true;
      return post.title.toLowerCase().includes(normalized);
    });
  }, [category, query]);

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Add an email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Subscription confirmed",
      description: "You will receive new TESBINN blog posts.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="bg-hero py-12 lg:py-16">
          <div className="container-wide section-padding space-y-4 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Blog</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Insights from the TESBINN team
            </h1>
            <p className="text-muted-foreground">
              Practical strategies, platform updates, and stories from the TESBINN learning
              community.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-wide section-padding space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Latest posts</h2>
                <p className="text-sm text-muted-foreground">
                  Browse thought leadership and platform updates.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search posts"
                  className="w-56"
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={cat === category ? "default" : "outline"}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <div key={post.id} className="rounded-2xl border border-border p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <Button variant="outline" size="sm">
                    Read article
                  </Button>
                </div>
              ))}
              {!filteredPosts.length && (
                <p className="text-sm text-muted-foreground">No posts match your search.</p>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-card">
          <div className="container-wide section-padding">
            <div className="rounded-2xl border border-border bg-muted/40 p-6 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">Subscribe to TESBINN updates</h2>
                  <p className="text-sm text-muted-foreground">
                    Get the latest stories and product news delivered to your inbox.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                  <Button onClick={handleSubscribe}>Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
