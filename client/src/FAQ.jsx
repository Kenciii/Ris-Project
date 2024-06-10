import React, { useState } from "react";
import { Collapse, Card, Button } from "react-bootstrap";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "What types of mobile phones do you offer?",
      answer: "We offer a variety of mobile devices. You can view our selection on our website."
    },
    {
      question: "What are the best-selling models?",
      answer: "The best-selling models are iPhone and Samsung."
    },
    {
      question: "Do I get a warranty on the mobile device?",
      answer: "Yes, every new device purchased from our store comes with a written 2-year warranty."
    },
    {
        question: "Do you offer trade-in services for old devices?",
        answer: "Yes, that's possible, of course, with prior arrangement."
      },
      {
        question: "How long does the repair of my device typically take?",
        answer: "The duration of the repair depends on the type of issue and the availability of parts. Typically, minor repairs can be completed within a few hours to a day, while more complex repairs might take longer, potentially a few days."
      },
   
  ];

  const toggleCollapse = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="container" style={{marginTop: "100px"}}>
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="d-flex flex-column align-items-center">
        {faqs.map((faq, index) => (
          <Card key={index} className="mb-3 w-75" style={{ borderRadius: "15px" }}>
            <Card.Header style={{ borderRadius: "15px" }}>
              <Button
                variant="link"
                onClick={() => toggleCollapse(index)}
                aria-controls={`faq-collapse-${index}`}
                aria-expanded={open === index}
                className="text-start w-100"
                style={{ textDecoration: "none" }}
              >
                {faq.question}
              </Button>
            </Card.Header>
            <Collapse in={open === index}>
              <div id={`faq-collapse-${index}`}>
                <Card.Body>{faq.answer}</Card.Body>
              </div>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
