import React from 'react';
import Header from '../components/Header';
import MainBackground from '../components/MainBackground';
import ExchangeForm from '@/components/ExchangeForm';

const Index = () => {
  return (
    <>
      <link rel="stylesheet" type="text/css" href="assets/css/v2/min_ff.css" />
      <main>
        <section id="index_main" className="main-section withheader darkbg">
          <style id="highlighting_style" dangerouslySetInnerHTML={{ __html: "" }} />
          <Header />
          <MainBackground />
          <div className="wrIndexer">
            <div className="exchange-form-outer">
              <h1>Payrius Exchange</h1>
              <ExchangeForm />
            </div>
            <template id="difference_tmpl" />
            <template id="popup_warning_fee" />
            <template id="popup_forbidden_usa" />
          </div>
        </section>
        <link rel="stylesheet" type="text/css" href="assets/css/svg_min.css" />
      </main>
    </>
  );
};

export default Index;