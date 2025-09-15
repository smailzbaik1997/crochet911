import Link from 'next/link'

export default function HomepageFAQ() {
  const faqs = [
    {
      question: "What is a crochet patterns directory?",
      answer: "A crochet patterns directory is a comprehensive collection or database of crochet patterns organized by categories, skill levels, and types. Our directory contains thousands of free and premium patterns from designers worldwide, making it easy to find the perfect project for any crocheter."
    },
    {
      question: "How many patterns are in your crochet pattern library?",
      answer: "Our ever-growing crochet pattern library contains thousands of patterns across 20+ main categories including animals, clothing, home decor, baby items, and seasonal designs. We regularly add new patterns from talented designers to keep our collection fresh and current."
    },
    {
      question: "Are there free crochet patterns in your directory?",
      answer: "Yes! Our crochet patterns directory includes many free patterns alongside premium designs. Free patterns are clearly marked and include basic instructions, material lists, and skill level indicators to help you choose the right project."
    },
    {
      question: "How do I navigate your crochet pattern catalog?",
      answer: "Our crochet pattern catalog is organized by categories for easy browsing. You can filter patterns by skill level (beginner to expert), yarn weight, project type, or use our search function to find specific patterns. Each pattern page includes detailed information about materials, difficulty, and designer credits."
    },
    {
      question: "Can I access patterns on mobile devices?",
      answer: "Absolutely! Our crochet patterns directory is fully mobile-responsive, allowing you to access your favorite patterns anywhere. Whether you're shopping for yarn or working on a project, you can easily view pattern details, instructions, and images on any device."
    },
    {
      question: "What skill levels are covered in your pattern directory?",
      answer: "Our comprehensive directory covers all skill levels from complete beginners to expert crocheters. Patterns are clearly labeled with difficulty levels, and we provide helpful filters to find projects that match your current abilities and comfort level."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Learn more about our <strong>crochet patterns directory</strong> and how to make the most of our extensive pattern collection.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                {faq.question}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Have more questions about our crochet pattern directory?
          </p>
          <Link
            href="/patterns"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Exploring Patterns
          </Link>
        </div>
      </div>
    </section>
  )
}