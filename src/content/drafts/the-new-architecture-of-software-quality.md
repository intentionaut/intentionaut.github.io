---
title: "The New Architecture of Software Quality"
description: "Why AI Broke Traditional Quality Definitions and What to do About It"
originalTitle: "The New Architecture of Software Quality"
originalUrl: "/writing/the-new-architecture-of-software-quality/"
---
*Traditional quality metrics optimised for predictable systems break down completely when software needs to handle ambiguity, context, and emergent behaviours. These patterns are the new normal of the AI era of software.*

Software quality is experiencing its most fundamental transformation since the shift from monolithic to distributed architectures. The deterministic quality metrics that defined software excellence—uptime, bug counts, performance benchmarks—now represent only the foundation layer.

The [2024 DORA report](https://refactoring.fm/p/code-quality-in-the-age-of-ai?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality), which I've cited before, found that AI adoption may actually *decrease* delivery throughput by 1.5% and reduce delivery stability by 7.2%, making new quality frameworks and ways of thinking essential.

The architectures we've built have optimised for linear, well-defined, intentional interactions. The systems of the future need to be more *expressive* by default—capable of handling ambiguity, context, and emergent behaviours that traditional quality frameworks struggle to measure.

I've been thinking, reading and trying to understand how we can measure quality in the age of AI. Four new quality angles are emerging as the differentiators and I wanted to share some ideas about how product leaders should think about software quality in the futures they're driving.

![Photo by Maria Sidorkina on Unsplash](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/eadb970f-8bcd-4a4e-ace8-85b535097a30/photo-1704967743995-d78ace54ba80.jpeg?t=1757709521)

We need a new set of pillars for software quality in the age of AI.

## 1\. Interoperability: The Promise of Platform Engineering

AI-era quality begins with platform engineering. What's shifting is the *focus*—from orchestrating integrations to enabling genuine interoperability between independent systems.

The breakthrough development reshaping AI interoperability is Anthropic's [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) (MCP), introduced in late 2024. MCP provides what its creators call "a universal, open standard for connecting AI systems with data sources" - essentially becoming the USB-C equivalent for AI integrations. The protocol addresses a fundamental constraint: even sophisticated models remain "trapped behind information silos and legacy systems," requiring custom implementations for every new data source.

As the foundation for interoperability is really driven by our platform capabilities and standardisation. Interoperability is a mix of systems, standards and tools that allow systems to exchange data and share functionality with each other.

Platform engineering's next phase is less about orchestrating and resolving integrations and more about ensuring that independent systems can work together effectively through interoperability. However, interoperability [isn't a silver bullet](https://spsoft.com/tech-insights/challenges-of-interoperability-in-healthcare/?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality); infrastructure quality and standardisation are essential to making the promise of those technologies valuable and sustainable to complex data systems and leaders driving AI adoption.

Interoperability [isn't just for systems,](https://www.techuk.org/resource/how-to-ensure-the-interoperability-and-portability-of-data-and-applications-in-a-multi-cloud-world-guest-blog-from-bjss.html?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) we need to be thinking about the interoperability of data to ensure we realise the full benefit of it. Common standards, protocols and orchestration are long term bets that product and engineering leaders need to be planning for today to realise the full maturity of AI's promises for their data and tech.

These architectural foundations deliver measurable competitive advantage. Lumen Technologies exemplifies the business impact: by integrating Microsoft Copilot across their sales systems, news feeds, and analytics platforms, their sales team reduced research time by 92%—from four hours per customer interaction to just 15 minutes. Ashley Haynes-Gaspar, Lumen's Chief Revenue Officer, explains the mathematics: "Four hours back each week is worth [$50 million in revenue](https://www.microsoft.com/en/customers/story/1771760434465986810-lumen-microsoft-copilot-telecommunications-en-united-states?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) over a 12-month period."

## 2\. Composability: From Microservices to Composition

Platform engineering creates the foundation, but composability determines how quickly you can innovate on top of it. Traditional composability patterns are undergoing rapid evolution to accommodate AI-specific needs—Netflix's recommendation services now require ML model versioning and real-time personalisation capabilities that traditional microservices weren't originally designed to handle.

[Netflix's ML transformation](https://netflixtechblog.medium.com/lessons-learnt-from-consolidating-ml-models-in-a-large-scale-recommendation-system-870c5ea5eb4a?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) illustrates this shift: their recommendation services now require ML model versioning, A/B testing infrastructure, and real-time personalisation capabilities that traditional microservices weren't originally designed to handle. This architectural evolution enables rapid content personalisation and experimentation that directly impacts subscriber retention. Platforms power the shift, but businesses have to make the bets that put them ahead.

Another personalisation use case from [Spotify demonstrates](https://engineering.atspotify.com/2021/12/how-spotify-uses-ml-to-create-the-future-of-personalization?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) composability maturity through their AI-native architecture. According to [Oskar Stål](https://www.youtube.com/watch?v=n16LOyba-SE&list=PLf1KFlSkDLIBNfiMCsXfj_pegmiyRwrSc&utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) each service manages its own ML models, training pipelines, and inference endpoints. This represents a fundamental evolution of traditional microservices thinking. Instead of simply abstracting away business logic, it's now highly desirable to make it widely available for intelligent capability composition.

## 3\. Observability: What it Does is How it’s Performing

The economics tell the story: the [AI observability market](https://market.us/report/ai-in-observability-market/?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) demonstrates explosive growth, projected to reach $10.7 billion by 2033 with a 22.5% compound annual growth rate. This reflects a critical recognition across enterprises—without comprehensive visibility into AI system behaviour, organisations face what experts call "expensive mysteries" when AI failures occur.

And here's what's interesting about the monitoring challenge. Composable architectures require visibility that extends beyond traditional performance metrics. When AI services interact across multiple systems, the debugging complexity grows exponentially. [Dynatrace frames it well](https://www.dynatrace.com/news/blog/what-is-observability-2/?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality): "Observability \[is\] the ability to measure a system's current state based on the data it generates"—but implementation in AI contexts requires fundamentally different approaches to what that data actually represents.

Google's [Site Reliability Engineering philosophy](https://sre.google/sre-book/monitoring-distributed-systems?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) offers really great guidance for other organisations: "Simple, predictable, and reliable monitoring over complex 'magic' systems". Their Four Golden Signals—Latency, Traffic, Errors, Saturation—provide the foundational framework, but implementation requires discipline in an AI context where traditional performance patterns don't apply.

Google's lessons can help everyone think about the future of software quality:

-   Design monitoring systems with simplicity in mind, avoiding AI-powered monitoring systems that create debugging complexity

-   Rules that catch real incidents should be predictable and reliable, not learned through ML models

-   Avoid systems that try to learn thresholds or detect causality automatically—AI monitoring AI creates recursive complexity

-   Use metrics for alerts, logs for root cause analysis, especially critical for AI inference chain debugging

Without proper observability, AI failures become expensive mysteries.

The Three Pillars of Observability (metrics, logs, traces) provide the debugging infrastructure that prevents costly downtime.

-   **Metrics** track SLIs, SLOs, and SLAs for trend identification across model performance.

-   **Logs** provide chronological event records for specific issue debugging in AI inference chains.

-   **Traces** offer code path observations across distributed AI systems where model calls span multiple services.

Companies making investments in observability will inevitably find themselves in a different place with their workforce and the skills of tomorrow too. Quality engineering roles are also changing. One article I came across recently framed it well, moving QA [from "pawns to supervisors,"](https://apiumhub.com/tech-blog-barcelona/qa-in-the-age-of-ai/?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) automating test case generation and documentation whilst requiring strategic human oversight for full value realisation.

![Close up of saleswoman hands accounting, billing some goods for sale, finance concept](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/84429e28-346f-4cd6-a85f-105474e88a2a/photo-1647427017067-8f33ccbae493.jpeg?t=1757966598)

Photo by Simon Kadula on Unsplash

## 4\. Explainability: The Architecture of Accountability

Observable systems tell you what happened, but explainable systems tell you why. This distinction becomes critical for regulatory compliance and stakeholder trust—and represents the most complex architectural challenge facing AI implementations today.

The regulatory landscape is about to shift dramatically. As the [EU AI Act](https://artificialintelligenceact.eu/article/99/?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality) takes effect with penalties reaching €35 million or 7% of worldwide annual turnover for violations—fines that exceed even GDPR maximums—European operations face an architecture of accountability. What emerges clearly from the regulatory timeline is that explainability becomes a compliance requirement, not an optional feature, with full enforcement beginning August 2026.

Companies that treat this as a future consideration rather than an immediate architectural decision are setting themselves up for expensive compliance scrambles.

Successful explainability architecture centres on comprehensive metadata management that supports business accountability.

-   **Model Lineage** provides complete traceability from training data to production decisions with version control.

-   **Feature Attribution** stores SHAP values and LIME approximations with predictions for regulatory audit trails.

-   **Decision Context** captures input data, model version, inference time, business context, and explanation request logs.

-   **Audit Trails** maintain user queries, model responses, explanation requests, and regulatory compliance documentation.

Two main explainability approaches dominate enterprise implementations. SHAP provides comprehensive explanations but requires significant compute and storage investment. LIME offers faster, lighter explanations but with limited scope for regulatory compliance. The choice between them often comes down to balancing explanation quality against operational costs—a strategic decision with direct business impact.

Effective explainability storage handles cached explanations for common queries, maintains version-linked audit trails, preserves compliance documentation, and provides standardised APIs for regulatory consistency.

## The Future of Quality in Software

The organisations positioning themselves for competitive advantage recognise that AI-era software quality extends far beyond traditional performance metrics. Platform engineering, composability, observability, and explainability represent the four pillars that will determine which companies can effectively leverage AI capabilities whilst maintaining the reliability, transparency, and accountability that enterprise software demands.

Quality leadership in the AI era requires mastering these interconnected disciplines, viewing them not as separate technical concerns but as integrated components of a comprehensive quality framework designed for intelligent systems that learn, evolve, and make autonomous decisions affecting business outcomes.

What becomes apparent when examining these four pillars together is that they represent more than incremental improvements to existing quality frameworks. They constitute early thinking about the architectural principles needed for expressive systems—systems that must handle ambiguity and context as core capabilities rather than edge cases.

The strategic challenge extends beyond current implementations to fundamental questions about measuring effectiveness in intelligent systems that learn, evolve, and make autonomous decisions affecting business outcomes. The organisations making these architectural bets today are positioning themselves to leverage AI capabilities whilst maintaining the reliability, transparency, and accountability that enterprise software demands.

Weekly AI insights that cut through the noise around AI. Practical patterns from enterprise implementations, delivered to product leaders building with AI.
Real patterns, real results, real impact. *Subscribe* *[here](https://magic.beehiiv.com/v1/96b7bfbb-25ad-448f-a8e8-b4d61019e30d?email={{email}}&utm_source=Article&utm_campaign=Subscriber%20footer)* *if you haven’t already.*

# **Worth Your Time**

Quality frameworks for AI products require new approaches beyond traditional metrics. These readings explore practical implementation strategies for the four pillars reshaping AI development.

## **The Essentials**

**[A guide on implementing effective AI evaluations](https://www.mindtheproduct.com/how-to-implement-effective-ai-evaluations/?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality)** **| Mind the Product** Essential framework for product managers building structured measurement systems for AI performance across multiple dimensions, with real-world case study from Harvey's legal AI.

**[How to Assess AI Feasibility: A Product Manager's Guide](https://angusallan.substack.com/p/how-to-assess-ai-feasibility-a-product?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality)** **| Angus Allan** Provides AI Feasibility Matrix tool for systematically evaluating AI ideas on technical feasibility and business impact dimensions, includes free Google Sheets template.

## **Industry Intel**

**[The Root Causes of Failure for Artificial Intelligence Projects](https://www.rand.org/pubs/research_reports/RRA2680-1.html?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality)** **| RAND Corporation** Evidence-based analysis from 65+ data scientists reveals 80% of AI projects fail—twice the rate of non-AI IT projects—identifying five leading root causes with actionable recommendations.

**[How observability is adjusting to generative AI](https://www.ibm.com/think/insights/observability-gen-ai?utm_source=newsletter.intentionaut.com&utm_medium=referral&utm_campaign=the-new-architecture-of-software-quality)** **| IBM Research** Focuses on measurable metrics that indicate system health and performance rather than trying to explain internal LLM decision-making processes, with practical monitoring approaches.

## For Our Consideration

These resources highlight a fundamental shift from deterministic quality metrics to expressive system capabilities. The emphasis on structured evaluation frameworks, feasibility assessment tools, and observable performance indicators reflects the industry's maturation beyond AI experimentation toward reliable production systems that handle ambiguity as a core feature rather than edge case.

# **Outside the Terminal:**

Sometimes, inspiration comes from places far from dashboards and workflows. These aren't AI-related, but they're things I’ve engaged with I thought might be worth mentioning. Here’s a snapshot of what’s shaping my thinking and keeping me curious this week:

## **Events** 

I’m looking forward to more conversations at the intersection of data fundamentals and AI-ready infrastructure. If you’re nearby, come say hi:

-   Product Tank Oxford - [September 23rd](https://techtrekevents.com/NEPSS2025/?utm_campaign=the-enterprise-guide-to-ai-economics&utm_medium=referral&utm_source=saielle.beehiiv.com), 6PM

-   NexGen Enterprise Search Summit – [September 24th](https://techtrekevents.com/NEPSS2025/?utm_campaign=the-enterprise-guide-to-ai-economics&utm_medium=referral&utm_source=saielle.beehiiv.com), 9AM

## **Film**

This week I had some real variety of what I watched, but I wanted to shout out the most moving of them all.

### The Wild Robot

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/79b28e52-dcf1-423e-b7cf-0383b1c154b1/the-wild-robot-gallery5.jpg?t=1756925775)

The Wild Robot, Roz, voiced by Lupita Nyong’o

I didn’t expect an animated film about a shipwrecked robot to wreck *me*, but here we are. It’s a stunning story of resilience, community, and the quiet power of difference. Watching Roz—this awkward, methodical outsider—learn to care for a gosling and earn a place in a wild ecosystem hit me harder than I expected.

What stood out wasn’t just the emotional depth, but how alive the film felt. As someone who spends a lot of time thinking about systems—technical, social, organisational—I was struck by the way the film explores adaptation. Roz doesn’t succeed by becoming like the others; she thrives by integrating who she is into the ecosystem around her. One for a future panel I’ll be announcing soon (Watch this space).

It’s a lovely reminder for any of us building products, teams, or infrastructure: complexity works best when every piece brings its own strengths. And yes, I ugly-cried at a baby goose learning to fly.

Thanks for making it all the way to the end. I’d love to know what’s sparking your curiosity this week—hit reply or share your own “Outside the Terminal” pick. Until next time, keep learning fast and building well.

**\-Saielle**

---

## Changelog

Live version, unchanged. Pulled into a draft page so it is previewable here while the original stands on the [Intentionaut newsletter](https://newsletter.intentionaut.com/). No wording changed.
