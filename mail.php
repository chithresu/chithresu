	<?php
						
								$name=$_POST['name'];
								$mail=$_POST['email'];
								$phone=$_POST['phone'];
								$contact_note=$_POST['contact_note'];
								
								$msg.="<table>";
								$msg.="<tr><td><b>Name:</b></td><td>" .$name. "</td></tr>";
								$msg.="<tr><td><b>Email:</b></td><td>" .$mail. "</td></tr>";
							    $msg.="<tr><td><b>Phone:</b></td><td>" .$phone. "</td></tr>";
								$msg.="<tr><td><b>Message:</b></td><td>" .$contact_note. "</td></tr>";
								$msg1="Thank you for Enquiry Chithresu Resume";
		
									$from=$_REQUEST['email'];
									$to="chithresu@gmail.com";
								    $headers = "From:" . $from;
									$headers1="To:" . $to;
									$headers .= "\r\nContent-Type: text/html; charset=ISO-8859-1\r\n"; 
									$headers1 .= "\r\nContent-Type: text/html; charset=ISO-8859-1\r\n"; 
								    if(mail($to, $name, $msg, $headers))
								    {
								        					
									echo"<script>alert('Thank you For Request,will contact Soon')</script>";
									echo"<script>window.location.href='index.php'</script>";
									
								    }
                                    else if(mail($from, $sub, $msg1, $headers1))
                                    
                                    {
                                        					
									echo"<script>alert('Thank you For Request,will contact Soon')</script>";
									echo"<script>window.location.href='index.php'</script>";
									
                                    }
								
								else
								{
									echo"<script>alert('Your Request Error,Please try again')</script>";
									echo"<script>window.location.href='index.php'</script>";
									
								}
						
							?>            