import React, { useState } from 'react';

const QuotationTable = () => {
  // State for table rows
  const [rows, setRows] = useState([
    {
      id: 1,
      item: '',
      hsn: '',
      qty: 1,
      unitPrice: 0.00,
      tax: 'No Tax',
      netAmount: 0.00
    }
  ]);

  // State for summary values
  const [summary, setSummary] = useState({
    subTotal: 0.00,
    discount: 0,
    discountType: '% (percentage)',
    totalTax: 0.00,
    adjustment: 0.00,
    shippingCharges: 0.00,
    total: 0.00
  });

  // State for bottom fields
  const [notes, setNotes] = useState({
    customerNote: 'hi this is Erp software',
    terms: 'Please Enter Terms And Conditions Here'
  });

  // Calculate totals when rows or summary values change
  React.useEffect(() => {
    calculateTotals();
  }, [rows, summary.discount, summary.discountType, summary.adjustment, summary.shippingCharges]);

  const calculateTotals = () => {
    // Calculate subtotal
    let subTotal = 0;
    let totalTax = 0;
    
    const updatedRows = rows.map(row => {
      const amount = row.qty * row.unitPrice;
      let taxRate = 0;
      
      if (row.tax === 'GST 5%') {
        taxRate = 0.05;
      } else if (row.tax === 'GST 12%') {
        taxRate = 0.12;
      }
      
      const taxAmount = amount * taxRate;
      const netAmount = amount + taxAmount;
      
      subTotal += amount;
      totalTax += taxAmount;
      
      return {
        ...row,
        netAmount: parseFloat(netAmount.toFixed(2))
      };
    });
    
    setRows(updatedRows);
    
    // Calculate discount
    let discountAmount = 0;
    if (summary.discountType === '% (percentage)') {
      discountAmount = subTotal * (summary.discount / 100);
    } else {
      discountAmount = summary.discount;
    }
    
    // Calculate total
    const total = subTotal - discountAmount + totalTax + parseFloat(summary.adjustment) + parseFloat(summary.shippingCharges);
    
    setSummary(prev => ({
      ...prev,
      subTotal: parseFloat(subTotal.toFixed(2)),
      totalTax: parseFloat(totalTax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    }));
  };

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      item: '',
      hsn: '',
      qty: 1,
      unitPrice: 0.00,
      tax: 'No Tax',
      netAmount: 0.00
    };
    setRows([...rows, newRow]);
  };

  const updateRow = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter(row => row.id !== id);
      setRows(updatedRows);
    }
  };

  const handleSave = () => {
    const data = {
      rows,
      summary,
      notes
    };
    console.log(JSON.stringify(data, null, 2));
    alert('Quotation data saved! Check console for details.');
  };

  return (
    <div className="flex min-h-screen">
      {/* Blue sidebar */}
      <div className="w-20 bg-[#1f3a93] flex flex-col items-center py-4">
        <div className="w-8 h-8 bg-white rounded-full mb-6"></div>
        <div className="w-8 h-8 bg-white rounded-full mb-6"></div>
        <div className="w-8 h-8 bg-white rounded-full mb-6"></div>
        <div className="w-8 h-8 bg-white rounded-full mb-6"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="max-w-[1250px] mx-auto">
          {/* Table section */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table header */}
                <thead>
                  <tr className="h-[60px] bg-[#f8f9fb] text-[#333333] text-sm font-medium">
                    <th className="w-[40px] text-center">#</th>
                    <th className="w-[370px] text-left pl-4">Items</th>
                    <th className="w-[130px] text-center">HSN / SAC</th>
                    <th className="w-[120px] text-center">Qty (Unit)</th>
                    <th className="w-[120px] text-right pr-4">Unit Price (₹)</th>
                    <th className="w-[110px] text-center">Tax</th>
                    <th className="w-[150px] text-right pr-4">Net Amount (₹)</th>
                    <th className="w-[50px] text-center">✓</th>
                  </tr>
                </thead>
                
                {/* Table body */}
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id} className="h-[60px] border-b border-[#e2e5ea]">
                      <td className="text-center text-[#333333] font-medium">{index + 1}</td>
                      <td className="pl-4">
                        <div className="flex items-center h-[60px]">
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={row.item}
                              onChange={(e) => updateRow(row.id, 'item', e.target.value)}
                              placeholder="Describe Here…"
                              className="w-full h-[38px] border border-[#e2e5ea] rounded-lg px-10 py-2 text-sm text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {/* Upload icon on the left */}
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                              </svg>
                            </div>
                            {/* Calendar icon on the right */}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <input
                          type="text"
                          value={row.hsn}
                          onChange={(e) => updateRow(row.id, 'hsn', e.target.value)}
                          className="w-full text-center bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                      </td>
                      <td className="text-center">
                        <select
                          value={row.qty}
                          onChange={(e) => updateRow(row.id, 'qty', parseInt(e.target.value))}
                          className="w-full text-center bg-transparent border-none focus:outline-none focus:ring-0"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </td>
                      <td className="text-right pr-4">
                        <input
                          type="number"
                          value={row.unitPrice}
                          onChange={(e) => updateRow(row.id, 'unitPrice', parseFloat(e.target.value))}
                          className="w-full text-right bg-transparent border-none focus:outline-none focus:ring-0"
                          step="0.01"
                        />
                      </td>
                      <td className="text-center">
                        <select
                          value={row.tax}
                          onChange={(e) => updateRow(row.id, 'tax', e.target.value)}
                          className="w-full text-center bg-transparent border-none focus:outline-none focus:ring-0"
                        >
                          <option value="No Tax">No Tax</option>
                          <option value="GST 5%">GST 5%</option>
                          <option value="GST 12%">GST 12%</option>
                        </select>
                      </td>
                      <td className="text-right pr-4 font-medium">
                        ₹{row.netAmount.toFixed(2)}
                      </td>
                      <td className="text-center">
                        <button 
                          onClick={() => removeRow(row.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Add row button */}
            <div className="p-4 border-t border-[#e2e5ea]">
              <button 
                onClick={addRow}
                className="flex items-center text-[#007bff] font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Row
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Summary panel */}
            <div className="w-full lg:w-[270px] ml-auto">
              <div className="bg-[#fafafa] border-l border-[#e5e5e5] p-4 rounded-lg">
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-[#333333]">Sub Total:</span>
                    <span className="text-[#333333]">₹{summary.subTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#333333]">Discount:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={summary.discount}
                        onChange={(e) => setSummary({...summary, discount: parseFloat(e.target.value) || 0})}
                        className="w-16 px-2 py-1 text-sm border border-[#e2e5ea] rounded text-[#333333] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <select
                        value={summary.discountType}
                        onChange={(e) => setSummary({...summary, discountType: e.target.value})}
                        className="text-sm border border-[#e2e5ea] rounded text-[#333333] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="% (percentage)">%</option>
                        <option value="Fixed">₹</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-[#333333]">Total Tax:</span>
                    <span className="text-[#333333]">+₹{summary.totalTax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#333333]">Adjustment:</span>
                    <input
                      type="number"
                      value={summary.adjustment}
                      onChange={(e) => setSummary({...summary, adjustment: parseFloat(e.target.value) || 0})}
                      className="w-24 px-2 py-1 text-sm border border-[#e2e5ea] rounded text-[#333333] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#333333]">Shipping Charges:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={summary.shippingCharges}
                        onChange={(e) => setSummary({...summary, shippingCharges: parseFloat(e.target.value) || 0})}
                        className="w-24 px-2 py-1 text-sm border border-[#e2e5ea] rounded text-[#333333] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <button className="text-[#007bff] text-sm">
                    Add Shipping Tax
                  </button>
                  
                  <div className="pt-2 border-t border-[#e5e5e5]">
                    <div className="flex justify-between">
                      <span className="text-[#333333] font-bold text-base">Total:</span>
                      <span className="text-[#333333] font-bold text-base">₹{summary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom fields */}
            <div className="w-full lg:w-[calc(100%-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs text-[#666666] mb-1">Customer Note</label>
                  <textarea
                    value={notes.customerNote}
                    onChange={(e) => setNotes({...notes, customerNote: e.target.value})}
                    className="w-full h-10 px-3 py-2 text-xs text-[#666666] border border-[#e2e5ea] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="hi this is Erp software"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666666] mb-1">Terms & Conditions</label>
                  <textarea
                    value={notes.terms}
                    onChange={(e) => setNotes({...notes, terms: e.target.value})}
                    className="w-full h-10 px-3 py-2 text-xs text-[#666666] border border-[#e2e5ea] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Please Enter Terms And Conditions Here"
                  />
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end gap-2">
                <button className="px-4.5 py-2.5 bg-[#e5e7eb] text-[#333] rounded-lg text-sm font-medium">
                  CLOSE
                </button>
                <button 
                  onClick={handleSave}
                  className="px-5.5 py-2.5 bg-[#0fb36e] text-white rounded-lg text-sm font-medium"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;