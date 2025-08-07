import React from 'react';
import { Flex, Progress, Card, Row, Col } from 'antd'; 

const Analytics = ({ transactions }) => {

  const totaltransactions = transactions.length;
  const totalincomecount = transactions.filter((t) => t.reference === 'income').length;
  const totalexpensecount = transactions.filter((t) => t.reference === 'expense').length;
  const incomepercentage = totaltransactions > 0 ? (totalincomecount / totaltransactions) * 100 : 0;
  const expensepercentage = totaltransactions > 0 ? (totalexpensecount / totaltransactions) * 100 : 0;
  
  const baseCardStyle = {
    borderRadius: '15px',
    color: 'white',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    border: 'none',
    height: '100%', 
  };

  const totalCardStyle = {
    ...baseCardStyle,
    background: 'linear-gradient(110deg, #6c757d 0%, #343a40 100%)', 
  };

  const incomeCardStyle = {
    ...baseCardStyle,
    background: 'linear-gradient(110deg, #49c165ff 0%, #60b373ff 100%)',
  };

  const expenseCardStyle = {
    ...baseCardStyle,
    background: 'linear-gradient(110deg, #cd4653ff 0%, #a71d2a 100%)',
  };

  const overviewCardStyle = {
      ...baseCardStyle,
      background: 'white', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  }

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: 'white',
  };

  const statDescriptionStyle = {
    fontSize: '0.9rem',
    margin: 0,
    opacity: 0.9,
    color: 'white',
  };
  
  const headStyle = {
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  };
  const headStyle2 = {
    color: 'black',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[24, 24]}>

        <Col xs={24} sm={12} md={8}> 
          <Card title="Total Transactions" style={totalCardStyle} headStyle={headStyle}>
            <h2 style={statNumberStyle}>{totaltransactions}</h2>
            <p style={statDescriptionStyle}>Number of transactions</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card title="Income Transactions" style={incomeCardStyle} headStyle={headStyle}>
            <h2 style={statNumberStyle}>{totalincomecount}</h2>
            <p style={statDescriptionStyle}>{incomepercentage.toFixed(2)}% of total transactions</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card title="Expense Transactions" style={expenseCardStyle} headStyle={headStyle}>
            <h2 style={statNumberStyle}>{totalexpensecount}</h2>
            <p style={statDescriptionStyle}>{expensepercentage.toFixed(2)}% of total transactions</p>
          </Card>
        </Col>

      </Row>
      <hr></hr>

     <div style={{marginTop: '40px'}}>
    <h2 style={{color: '#333', marginBottom: '20px'}}>Percentage Overview</h2>

        <Row gutter={[24, 24]}> 

        <Col xs={24} md={12}>
            <Card title="Linear Progress" style={overviewCardStyle} headStyle={headStyle2}>
                <Flex gap="large" vertical>
                    <div>
                        <span style={{color: 'black'}}>Income Percentage</span>
                        <Progress percent={Number(incomepercentage.toFixed(2))} strokeColor={{'0%': '#87d068', '100%': '#13c24d'}} />
                    </div>
                    <div>
                        <span style={{color: 'black'}}>Expense Percentage</span>
                        <Progress percent={Number(expensepercentage.toFixed(2))} strokeColor={{'0%': '#f50', '100%': '#cf1322'}} />
                    </div>
                </Flex>
            </Card>
        </Col>

        <Col xs={24} md={12}>
            <Card title="Circular Breakdown" style={overviewCardStyle} headStyle={headStyle2}>
                <Flex gap="large" justify="center" wrap>
                    <Progress type="circle" percent={Number(incomepercentage.toFixed(0))} strokeColor={{'0%': '#87d068', '100%': '#13c24d'}} format={percent => <span style={{color: 'black'}}>{percent}%</span>} />
                    <Progress type="circle" percent={Number(expensepercentage.toFixed(0))} strokeColor={{'0%': '#f50', '100%': '#cf1322'}} format={percent => <span style={{color: 'black'}}>{percent}%</span>} />
                </Flex>
            </Card>
        </Col>
        
    </Row>
</div>
    </div>
    
  );
};

export default Analytics;