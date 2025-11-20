User = Struct.new(:name, :country, :email, keyword_init: true)
LineItem = Struct.new(:price, :quantity, keyword_init: true) do
  def subtotal
    price * quantity
  end
end

class TaxCalculator
  TAX_RATES = {
    "EG" => 0.14,
    default: 0.20
  }

  def calculate_tax(total, country)
    tax_rate = TAX_RATES[country] || TAX_RATES[:default]
    total * tax_rate
  end
end

class PaymentMethod
  def process_payment(amount)
    raise NotImplementedError, "Subclasses must implement process_payment"
  end
end

class VisaPayment < PaymentMethod
  def process_payment(amount)
    "Paid #{amount} using VISA"
  end
end

class PayPalPayment < PaymentMethod
  def process_payment(amount)
    "Paid #{amount} using PayPal"
  end
end

class CashPayment < PaymentMethod
  def process_payment(amount)
    "Paid #{amount} with CASH"
  end
end

class PaymentFactory
  def self.create(method)
    case method
    when :visa then VisaPayment.new
    when :paypal then PayPalPayment.new
    when :cash then CashPayment.new
    else raise "Payment method not supported: #{method}"
    end
  end
end

class Logger
  def log(message)
    raise NotImplementedError, "Subclasses must implement log"
  end
end

class FileLogger < Logger
  def initialize(filename = "invoice_log.txt")
    @filename = filename
  end

  def log(message)
    File.open(@filename, "a") do |f|
      f.puts "#{Time.now}: #{message}"
    end
  end
end

class ConsoleLogger < Logger
  def log(message)
    puts message
  end
end

class Notifier
  def notify(user, message)
    raise NotImplementedError, "Subclasses must implement notify"
  end
end

class EmailNotifier < Notifier
  def notify(user, message)
    "Email sent to #{user.email}: #{message}"
  end
end

class ConsoleNotifier < Notifier
  def notify(user, message)
    puts "Notification to #{user.name}: #{message}"
  end
end

class InvoiceProcessor
  def initialize(
    tax_calculator: TaxCalculator.new,
    logger: ConsoleLogger.new,
    notifier: ConsoleNotifier.new
  )
    @tax_calculator = tax_calculator
    @logger = logger
    @notifier = notifier
  end

  def process(user, items, payment_method_type)
    # Calculate total
    subtotal = calculate_subtotal(items)
    tax = @tax_calculator.calculate_tax(subtotal, user.country)
    total = subtotal + tax

    # Process payment
    payment_method = PaymentFactory.create(payment_method_type)
    payment_result = payment_method.process_payment(total)

    # Log transaction
    @logger.log("User: #{user.name}, Total: #{total}, Payment: #{payment_method_type}")

    # Send notification
    @notifier.notify(user, "Thanks for your purchase of $#{total}")

    {
      subtotal: subtotal,
      tax: tax,
      total: total,
      payment_result: payment_result
    }
  end

  private

  def calculate_subtotal(items)
    items.sum(&:subtotal)
  end
end