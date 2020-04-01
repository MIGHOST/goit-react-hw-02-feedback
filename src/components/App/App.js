import React, { Component } from 'react';
import './App.css';
import Section from '../Section/Section';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import FeedbackName from '../../utils/FeedbackName';
import Notification from '../Notification/Notification';

const options = Object.values(FeedbackName);

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleChange = e => {
    const feedbackText = e.target.textContent;
    this.setState(state => ({
      [feedbackText]: state[feedbackText] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    if (total) {
      return ((good / total) * 100).toFixed();
    }
    return 0;
  };
  render() {
    const { good, neutral, bad } = this.state;
    const total = 0 || this.countTotalFeedback();
    const percentage = 0 || this.countPositiveFeedbackPercentage();
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleChange}
          />
        </Section>
        <Section title="Statistic">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={percentage}
            />
          ) : (
            <Notification message="No feedback given"></Notification>
          )}
        </Section>
      </div>
    );
  }
}
