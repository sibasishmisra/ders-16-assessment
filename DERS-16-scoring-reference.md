# DERS-16 — Complete Scoring, Interpretation & Deployment Reference

> Difficulties in Emotion Regulation Scale, 16-item version
> Bjureberg, Ljótsson, Tull, et al. (2016), *Journal of Psychopathology and Behavioral Assessment*, 38, 284–296.
> DOI: 10.1007/s10862-015-9514-x

This document covers (1) what the instrument actually measures, (2) its
psychometric properties, (3) the authentic 16 items, (4) correct scoring
logic, (5) defensible interpretation, and (6) how — and how not — to use it
in a hiring context.

---

## 1. Concept & theory — what is actually being measured

Emotion regulation, in the Gratz & Roemer (2004) model the DERS is built on,
is the set of processes by which a person **monitors, evaluates, and modulates
emotional reactions** in order to pursue goals — *not* the absence of negative
emotion. The model treats emotions as functional and adaptive; the construct
of interest is the **difficulty** people have working *with* their emotions.

Three things follow that are essential to understand before you build anything
on top of this:

1. **The DERS-16 measures *difficulty*, not competency.** It is a deficit
   scale. Higher = more dysregulation. It does not measure "emotional
   intelligence," "resilience," or any positively-framed workplace strength.
   Re-labelling it "emotional competency assessment" in a hiring UI is a
   mismatch between what the instrument measures and what it's presented as.

2. **It is a clinical instrument.** It was developed and validated in clinical
   and community samples to assess *clinically relevant* emotion-regulation
   difficulties, and it discriminates clinical from non-clinical populations.

3. **It is dimensional, not diagnostic.** There is no validated cut-off that
   classifies someone as "regulated" vs "dysregulated." A score is a position
   on a continuum, interpreted relative to norms.

### The five dimensions (DERS-16)

The DERS-16 was derived from the 36-item DERS and **deliberately dropped the
"Awareness" subscale** (Bardeen et al. argued awareness is not an ER strategy
per se). It retains **five** factors:

| Subscale | Construct |
|---|---|
| **Clarity** | Lack of emotional clarity — knowing/understanding what one feels |
| **Goals** | Difficulty engaging in goal-directed behaviour when distressed |
| **Impulse** | Difficulty controlling impulsive behaviour when distressed |
| **Strategies** | Belief that little can be done to regulate emotions once upset |
| **Nonacceptance** | Negative, self-judging reactions to one's own distress |

> If your implementation shows an **Awareness** subscale, it is running the
> 36-item structure against 16 items — a bug, not a variant.

---

## 2. Psychometric properties (and why they matter for use)

- **Reliability:** Excellent internal consistency; good test-retest reliability
  (total-scale ICC ~0.91 in retest studies).
- **Validity:** Good convergent/discriminant validity; performs comparably to
  the full 36-item DERS.
- **What high scores correlate with:** psychological inflexibility, anxiety
  sensitivity, emotional impulsivity, **borderline personality traits**,
  general distress (**depression, anxiety, stress**), alcohol-use problems,
  **disordered eating**, and **self-harm behaviours**.

That last list is the crux for any selection use case: a high DERS-16 score is
empirically entangled with mental-health conditions. Decisions made on it are,
statistically, decisions correlated with disability status. Hold that thought
for Section 6.

What the literature does **not** establish: any link between DERS-16 scores and
**job performance**. The instrument was never validated as a selection or
performance-prediction tool.

---

## 3. The authentic 16 items

**Response scale (all items, 1–5):**

| Value | Anchor |
|---|---|
| 1 | Almost never (0–10%) |
| 2 | Sometimes (11–35%) |
| 3 | About half the time (36–65%) |
| 4 | Most of the time (66–90%) |
| 5 | Almost always (91–100%) |

**Items** (numbered 1–16 in standard presentation order; subscale in brackets):

1. I have difficulty making sense out of my feelings. **[Clarity]**
2. I am confused about how I feel. **[Clarity]**
3. When I'm upset, I have difficulty getting work done. **[Goals]**
4. When I'm upset, I become out of control. **[Impulse]**
5. When I'm upset, I believe that I will remain that way for a long time. **[Strategies]**
6. When I'm upset, I believe that I'll end up feeling very depressed. **[Strategies]**
7. When I'm upset, I have difficulty focusing on other things. **[Goals]**
8. When I'm upset, I feel out of control. **[Impulse]**
9. When I'm upset, I feel ashamed with myself for feeling that way. **[Nonacceptance]**
10. When I'm upset, I feel like I am weak. **[Nonacceptance]**
11. When I'm upset, I have difficulty controlling my behaviors. **[Impulse]**
12. When I'm upset, I believe that there is nothing I can do to make myself feel better. **[Strategies]**
13. When I'm upset, I become irritated at myself for feeling that way. **[Nonacceptance]**
14. When I'm upset, I start to feel very bad about myself. **[Strategies]**
15. When I'm upset, I have difficulty concentrating. **[Goals]**
16. When I'm upset, I believe that wallowing in it is all I can do. **[Strategies]**

> **Two deployment notes.**
> (a) **No reverse-scored items.** Unlike the 36-item DERS, the DERS-16 has
> none. Every item is summed as-is. If you ported scoring from DERS-36 code,
> delete any reverse logic.
> (b) **Verify against the primary source before production.** Minor wording
> variants and translations exist. For any real-world administration, confirm
> exact item text and licensing terms against Bjureberg et al. (2016). The
> instrument is freely available for research/clinical use, but confirm the
> terms for a commercial product.

---

## 4. Scoring logic

**Item → subscale map and ranges:**

| Subscale | Items | Min | Max |
|---|---|---|---|
| Clarity | 1, 2 | 2 | 10 |
| Goals | 3, 7, 15 | 3 | 15 |
| Impulse | 4, 8, 11 | 3 | 15 |
| Strategies | 5, 6, 12, 14, 16 | 5 | 25 |
| Nonacceptance | 9, 10, 13 | 3 | 15 |
| **TOTAL** | all 16 | **16** | **80** |

**Procedure:**

1. Each item scored 1–5 as answered (no reversals).
2. Subscale raw score = sum of its items.
3. Total = sum of all 16 items.
4. **Total range is 16–80, not 0–80.** The floor is 16 because each item's
   minimum is 1. A "25" is near the *bottom* of the real range — render bars
   and percentages against 16–80, or you will systematically understate how low
   a low score is.

**Integrity checks** (these would have caught the common build bugs):
- Sum of subscale maxes must equal **80** (not 85).
- Exactly 16 unique items, covering 1–16, no duplicates.
- **No Awareness subscale.**

---

## 5. Interpretation

The DERS-16 is **dimensional with no official diagnostic cut-offs.** Proper
interpretation is **normative** — comparing a score to a relevant reference
population's distribution (percentiles), not to a hard threshold.

Reference anchors from the literature (approximate, population-dependent):
- Community/non-clinical adults tend to cluster in the low-to-mid range.
- Treatment-seeking/clinical samples score meaningfully higher and the
  instrument reliably separates the two groups.

**Any banding you display (e.g. Low / Mild–Moderate / Elevated / High) is a
presentation convenience, not a clinical determination.** Do not present
quartile bands as if they were validated thresholds, and never auto-generate
mental-health language ("this person is dysregulated/unstable") from a single
self-report score. A single administration is a snapshot, is self-report (and
therefore fakeable and state-dependent), and carries a wide confidence band at
the individual level.

---

## 6. Using the DERS-16 in a hiring context — read before building any backend

This section is deliberately blunt because the design described ("score in the
backend, impact the hiring decision, without showing the applicant") concentrates
several serious risks at once. The goal here is to keep the company out of
litigation and to point you at a version that actually works.

### Why covert score-based gating is the high-risk path

1. **It likely qualifies as a medical/psychological examination.** The DERS
   measures clinically-relevant emotional difficulties. In the US, the ADA
   restricts medical examinations in hiring — generally prohibited pre-offer.
   A clinical dysregulation scale used as a screen is exactly the kind of
   instrument that draws that classification.

2. **It is a disability-discrimination disparate-impact engine.** High scores
   correlate with depression, anxiety, BPD traits, eating disorders, and
   self-harm. Screening out high scorers screens out, disproportionately,
   people with mental-health conditions — a protected class. That is the
   textbook shape of a disparate-impact claim.

3. **It has no job-performance validity.** Using a score to make selection
   decisions requires evidence the score predicts performance. None exists for
   the DERS. An invalid selection device fails the basic legal defensibility
   test (job-relatedness / business necessity) and simply doesn't predict what
   you want.

4. **Covert use removes your two best defences.** Hiding the scoring from the
   applicant eliminates informed consent and eliminates any adverse-action
   transparency. Those are the things that would otherwise mitigate liability.
   Concealment converts a weak process into an indefensible one and removes the
   candidate's ability to seek an accommodation they're legally entitled to.

5. **Jurisdiction stacks the risk.** US (ADA, Title VII/EEOC, plus state laws),
   EU/UK (GDPR special-category health data + automated-decision rules), and
   India's emerging DPDP framework all impose constraints on processing
   health-adjacent data and on automated decisions affecting individuals.

### What to build instead (the defensible architecture)

**Principle: keep clinical instruments out of the selection gate. Measure the
job-relevant behaviour directly, with consent and transparency.**

1. **Pick the right instrument for the job, not a clinical one.**
   - Use **situational judgement tests (SJTs)** built around your actual role
     scenarios, **structured behavioural interviews** with anchored rating
     scales, or **work-sample tasks**. These are validatable and defensible.
   - If you want a trait/EI signal, use instruments **designed and normed for
     personnel selection** (with published criterion validity), not a clinical
     dysregulation scale.

2. **Validate before you gate.** Run a validation study linking the
   assessment to performance outcomes in *your* roles before any score
   influences a decision. No validation → no gating.

3. **Consent and transparency by default.** Tell candidates what is being
   assessed and how it's used. Provide a route to request accommodation. A
   transparent process is both more lawful and produces better candidate
   experience and signal.

4. **Human-in-the-loop adverse action.** No fully-automated reject on a score.
   A person reviews; the candidate can be informed and respond. Keep an audit
   trail.

5. **If you genuinely want a wellbeing/EQ feature, separate it from selection.**
   A *voluntary, self-facing* emotional self-awareness tool (results shown to
   the candidate, never used against them) is a legitimate product. A *covert
   selection filter* is not. Pick one; do not blend them.

### Bottom line

The corrected scoring makes the DERS-16 **accurate**. It does not make it
**valid or lawful as a covert hiring filter**. Fixing the math and then wiring
it into hidden reject logic ships a precise, well-engineered liability. Build
the assessment layer on job-validated, consented, transparent components and
keep the clinical instruments for clinical and (consented) self-assessment
purposes where they belong.

---

*Primary source: Bjureberg, J., Ljótsson, B., Tull, M. T., Hedman, E., Sahlin,
H., Lundh, L.-G., Bjärehed, J., DiLillo, D., Messman-Moore, T., Gumpert, C. H.,
& Gratz, K. L. (2016). Development and Validation of a Brief Version of the
Difficulties in Emotion Regulation Scale: The DERS-16. Journal of
Psychopathology and Behavioral Assessment, 38, 284–296.*

*This reference is informational and is not legal advice. Confirm
jurisdiction-specific obligations with qualified employment counsel before
deploying any assessment in hiring.*
